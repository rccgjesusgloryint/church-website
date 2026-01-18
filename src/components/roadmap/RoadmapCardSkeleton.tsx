"use client";

export default function RoadmapCardSkeleton() {
  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm animate-pulse">
      {/* Timeline connector */}
      <div className="absolute left-[-25px] top-7 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-gray-950" />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status badge skeleton */}
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
          {/* Priority indicator skeleton */}
          <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
        {/* Target date skeleton */}
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>

      {/* Title skeleton */}
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-2" />

      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>

      {/* Labels skeleton */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-md" />
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        {/* Vote buttons skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        </div>
        {/* Updated date skeleton */}
        <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>
    </div>
  );
}
