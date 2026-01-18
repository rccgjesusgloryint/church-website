"use client";

import { RoadmapItem, RoadmapStatus } from "@/lib/types";
import RoadmapCard from "./RoadmapCard";
import { HiLightBulb, HiExternalLink } from "react-icons/hi";
import Link from "next/link";

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
  showFeedbackLink?: boolean;
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
    showFeedbackLink: true,
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
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                {section.showFeedbackLink && (
                  <Link
                    href="https://feedback.jesusgloryintl.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 rounded-full transition-colors"
                  >
                    <HiLightBulb className="w-4 h-4" />
                    <span>Share your ideas</span>
                    <HiExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
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
