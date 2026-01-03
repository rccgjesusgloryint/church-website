"use client";

import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { submitRoadmapVote } from "@/lib/linear";

interface VoteButtonsProps {
  issueId: string;
  userId: string | null;
  initialUpvotes: number;
  initialDownvotes: number;
  initialUserVote: "up" | "down" | null;
  isSignedIn: boolean;
}

export default function VoteButtons({
  issueId,
  userId,
  initialUpvotes,
  initialDownvotes,
  initialUserVote,
  isSignedIn,
}: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(initialUserVote);
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (voteType: "up" | "down") => {
    if (!isSignedIn || isLoading || !userId) return;

    setIsLoading(true);
    try {
      const result = await submitRoadmapVote(issueId, userId, voteType);
      setUpvotes(result.upvotes);
      setDownvotes(result.downvotes);
      setUserVote(result.userVote);
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleVote("up")}
        disabled={!isSignedIn || isLoading}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
          transition-all duration-200 ease-in-out
          ${
            userVote === "up"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }
          ${!isSignedIn ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isLoading ? "opacity-50" : ""}
        `}
        title={isSignedIn ? "Vote up" : "Sign in to vote"}
      >
        <FaThumbsUp
          className={`w-3.5 h-3.5 ${userVote === "up" ? "fill-current" : ""}`}
        />
        <span>{upvotes}</span>
      </button>

      <button
        onClick={() => handleVote("down")}
        disabled={!isSignedIn || isLoading}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
          transition-all duration-200 ease-in-out
          ${
            userVote === "down"
              ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }
          ${!isSignedIn ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isLoading ? "opacity-50" : ""}
        `}
        title={isSignedIn ? "Vote down" : "Sign in to vote"}
      >
        <FaThumbsDown
          className={`w-3.5 h-3.5 ${userVote === "down" ? "fill-current" : ""}`}
        />
        <span>{downvotes}</span>
      </button>
    </div>
  );
}
