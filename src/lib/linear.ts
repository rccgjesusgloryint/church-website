"use server";

import { LinearClient, Issue, LinearDocument } from "@linear/sdk";
import { prisma } from "./db";
import { RoadmapItem, RoadmapStatus } from "./types";

// Initialize Linear client
const getLinearClient = () => {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    throw new Error("LINEAR_API_KEY is not set in environment variables");
  }
  return new LinearClient({ apiKey });
};

// Map Linear workflow state to our RoadmapStatus
const mapStateToStatus = (stateName: string): RoadmapStatus => {
  const lowerName = stateName.toLowerCase();

  if (
    lowerName.includes("done") ||
    lowerName.includes("completed") ||
    lowerName.includes("complete")
  ) {
    return "completed";
  }
  if (
    lowerName.includes("progress") ||
    lowerName.includes("started") ||
    lowerName.includes("review")
  ) {
    return "in_progress";
  }
  if (lowerName.includes("cancel") || lowerName.includes("duplicate")) {
    return "cancelled";
  }
  // Default: backlog, todo, planned, etc.
  return "planned";
};

// Map Linear priority (1=urgent, 4=low, 0=none) to display number
const mapPriority = (priority: number): number => {
  const priorityMap: Record<number, number> = {
    1: 4, // Urgent -> highest
    2: 3, // High
    3: 2, // Medium
    4: 1, // Low
    0: 0, // No priority
  };
  return priorityMap[priority] ?? 0;
};

export type RoadmapPaginatedResponse = {
  items: RoadmapItem[];
  hasNextPage: boolean;
  endCursor: string | null;
};

export async function getRoadmapItems(
  userId?: string,
  cursor?: string,
  limit: number = 10
): Promise<RoadmapPaginatedResponse> {
  const linear = getLinearClient();
  const teamKey = process.env.LINEAR_TEAM_KEY;

  if (!teamKey) {
    throw new Error("LINEAR_TEAM_KEY is not set in environment variables");
  }

  try {
    // First, get the team by its key (e.g., "JGWEB") to get the UUID
    const teams = await linear.teams({
      filter: { key: { eq: teamKey } },
    });

    const team = teams.nodes[0];
    if (!team) {
      throw new Error(`Team with key "${teamKey}" not found`);
    }

    // Fetch issues from the specified team using the UUID with pagination
    const issues = await linear.issues({
      filter: {
        team: { id: { eq: team.id } },
      },
      orderBy: LinearDocument.PaginationOrderBy.UpdatedAt,
      first: limit,
      after: cursor,
    });

    // Get all votes for these issues
    const issueIds = issues.nodes.map((issue) => issue.id);
    const allVotes = await prisma.roadmapVote.groupBy({
      by: ["linearIssueId", "voteType"],
      where: {
        linearIssueId: { in: issueIds },
      },
      _count: true,
    });

    // Get current user's votes if signed in
    let userVotes: Record<string, "up" | "down"> = {};
    if (userId) {
      const votes = await prisma.roadmapVote.findMany({
        where: {
          userId,
          linearIssueId: { in: issueIds },
        },
      });
      userVotes = votes.reduce((acc, vote) => {
        acc[vote.linearIssueId] = vote.voteType as "up" | "down";
        return acc;
      }, {} as Record<string, "up" | "down">);
    }

    // Build vote counts map
    const voteCounts: Record<string, { up: number; down: number }> = {};
    for (const vote of allVotes) {
      if (!voteCounts[vote.linearIssueId]) {
        voteCounts[vote.linearIssueId] = { up: 0, down: 0 };
      }
      if (vote.voteType === "up") {
        voteCounts[vote.linearIssueId].up = vote._count;
      } else {
        voteCounts[vote.linearIssueId].down = vote._count;
      }
    }

    // Transform issues to RoadmapItems
    const roadmapItems: RoadmapItem[] = await Promise.all(
      issues.nodes.map(async (issue: Issue) => {
        const state = await issue.state;
        const labels = await issue.labels();
        const dueDate = issue.dueDate;

        return {
          id: issue.id,
          title: issue.title,
          description: issue.description ?? null,
          status: mapStateToStatus(state?.name ?? ""),
          priority: mapPriority(issue.priority),
          labels: labels.nodes.map((label) => label.name),
          targetDate: dueDate ? new Date(dueDate).toISOString() : null,
          createdAt: new Date(issue.createdAt).toISOString(),
          updatedAt: new Date(issue.updatedAt).toISOString(),
          upvotes: voteCounts[issue.id]?.up ?? 0,
          downvotes: voteCounts[issue.id]?.down ?? 0,
          userVote: userVotes[issue.id] ?? null,
        };
      })
    );

    return {
      items: roadmapItems,
      hasNextPage: issues.pageInfo.hasNextPage,
      endCursor: issues.pageInfo.endCursor ?? null,
    };
  } catch (error) {
    console.error("Error fetching roadmap items from Linear:", error);
    throw error;
  }
}

export type RoadmapStats = {
  inProgress: number;
  planned: number;
  completed: number;
  cancelled: number;
  total: number;
};

export async function getRoadmapStats(): Promise<RoadmapStats> {
  const linear = getLinearClient();
  const teamKey = process.env.LINEAR_TEAM_KEY;

  if (!teamKey) {
    throw new Error("LINEAR_TEAM_KEY is not set in environment variables");
  }

  try {
    // Get the team by its key
    const teams = await linear.teams({
      filter: { key: { eq: teamKey } },
    });

    const team = teams.nodes[0];
    if (!team) {
      throw new Error(`Team with key "${teamKey}" not found`);
    }

    // Fetch ALL issues (no pagination limit) to count statuses
    // Linear SDK returns up to 50 by default, we can fetch more for counting
    let allIssues: Issue[] = [];
    let hasNextPage = true;
    let cursor: string | undefined;

    while (hasNextPage) {
      const issues = await linear.issues({
        filter: {
          team: { id: { eq: team.id } },
        },
        first: 100,
        after: cursor,
      });

      allIssues = [...allIssues, ...issues.nodes];
      hasNextPage = issues.pageInfo.hasNextPage;
      cursor = issues.pageInfo.endCursor ?? undefined;
    }

    // Count by status
    const stats: RoadmapStats = {
      inProgress: 0,
      planned: 0,
      completed: 0,
      cancelled: 0,
      total: allIssues.length,
    };

    await Promise.all(
      allIssues.map(async (issue) => {
        const state = await issue.state;
        const status = mapStateToStatus(state?.name ?? "");

        switch (status) {
          case "in_progress":
            stats.inProgress++;
            break;
          case "planned":
            stats.planned++;
            break;
          case "completed":
            stats.completed++;
            break;
          case "cancelled":
            stats.cancelled++;
            break;
        }
      })
    );

    return stats;
  } catch (error) {
    console.error("Error fetching roadmap stats from Linear:", error);
    throw error;
  }
}

export async function submitRoadmapVote(
  linearIssueId: string,
  userId: string,
  voteType: "up" | "down"
): Promise<{
  upvotes: number;
  downvotes: number;
  userVote: "up" | "down" | null;
}> {
  try {
    // Check if user already voted
    const existingVote = await prisma.roadmapVote.findUnique({
      where: {
        linearIssueId_userId: {
          linearIssueId,
          userId,
        },
      },
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Same vote - remove it (toggle off)
        await prisma.roadmapVote.delete({
          where: { id: existingVote.id },
        });
      } else {
        // Different vote - update it
        await prisma.roadmapVote.update({
          where: { id: existingVote.id },
          data: { voteType },
        });
      }
    } else {
      // No existing vote - create new
      await prisma.roadmapVote.create({
        data: {
          linearIssueId,
          userId,
          voteType,
        },
      });
    }

    // Get updated counts
    const [upvotes, downvotes, currentVote] = await Promise.all([
      prisma.roadmapVote.count({
        where: { linearIssueId, voteType: "up" },
      }),
      prisma.roadmapVote.count({
        where: { linearIssueId, voteType: "down" },
      }),
      prisma.roadmapVote.findUnique({
        where: {
          linearIssueId_userId: { linearIssueId, userId },
        },
      }),
    ]);

    return {
      upvotes,
      downvotes,
      userVote: (currentVote?.voteType as "up" | "down") ?? null,
    };
  } catch (error) {
    console.error("Error submitting roadmap vote:", error);
    throw error;
  }
}

export async function getVoteCounts(
  linearIssueId: string
): Promise<{ upvotes: number; downvotes: number }> {
  const [upvotes, downvotes] = await Promise.all([
    prisma.roadmapVote.count({
      where: { linearIssueId, voteType: "up" },
    }),
    prisma.roadmapVote.count({
      where: { linearIssueId, voteType: "down" },
    }),
  ]);

  return { upvotes, downvotes };
}
