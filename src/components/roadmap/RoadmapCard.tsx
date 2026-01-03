"use client";

import { RoadmapItem } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import PriorityIndicator from "./PriorityIndicator";
import VoteButtons from "./VoteButtons";

interface RoadmapCardProps {
  item: RoadmapItem;
  isSignedIn: boolean;
  userId: string | null;
}

export default function RoadmapCard({
  item,
  isSignedIn,
  userId,
}: RoadmapCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Timeline connector */}
      <div className="absolute left-[-25px] top-7 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 border-4 border-white dark:border-gray-950 shadow-sm" />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={item.status} />
          <PriorityIndicator priority={item.priority} />
        </div>
        {item.targetDate && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Target: {formatDate(item.targetDate)}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {item.title}
      </h3>

      {/* Description */}
      {item.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {item.description}
        </p>
      )}

      {/* Labels */}
      {item.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.labels.map((label) => (
            <span
              key={label}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <VoteButtons
          issueId={item.id}
          userId={userId}
          initialUpvotes={item.upvotes}
          initialDownvotes={item.downvotes}
          initialUserVote={item.userVote}
          isSignedIn={isSignedIn}
        />
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Updated {formatDate(item.updatedAt)}
        </span>
      </div>
    </div>
  );
}
