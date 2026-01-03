"use client";

import { RoadmapItem, RoadmapStatus } from "@/lib/types";
import RoadmapCard from "./RoadmapCard";

interface RoadmapTimelineProps {
  items: RoadmapItem[];
  isSignedIn: boolean;
  userId: string | null;
}

type Section = {
  status: RoadmapStatus[];
  title: string;
  description: string;
  emptyMessage: string;
};

const sections: Section[] = [
  {
    status: ["in_progress"],
    title: "🚀 In Progress",
    description: "Features currently being worked on",
    emptyMessage: "No features currently in progress",
  },
  {
    status: ["planned"],
    title: "📋 Planned",
    description: "Upcoming features on our roadmap",
    emptyMessage: "No planned features at the moment",
  },
  {
    status: ["completed"],
    title: "✅ Completed",
    description: "Recently shipped features",
    emptyMessage: "No completed features yet",
  },
];

export default function RoadmapTimeline({
  items,
  isSignedIn,
  userId,
}: RoadmapTimelineProps) {
  const getItemsByStatus = (statuses: RoadmapStatus[]) => {
    return items
      .filter((item) => statuses.includes(item.status))
      .sort((a, b) => {
        // Sort by priority (high first), then by updated date
        if (b.priority !== a.priority) {
          return b.priority - a.priority;
        }
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
  };

  return (
    <div className="space-y-12">
      {sections.map((section) => {
        const sectionItems = getItemsByStatus(section.status);

        return (
          <div key={section.title} className="relative">
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {section.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {section.description}
              </p>
            </div>

            {/* Timeline Container */}
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800">
              {sectionItems.length > 0 ? (
                <div className="space-y-6">
                  {sectionItems.map((item) => (
                    <RoadmapCard
                      key={item.id}
                      item={item}
                      isSignedIn={isSignedIn}
                      userId={userId}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-400 dark:text-gray-500 italic">
                    {section.emptyMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
