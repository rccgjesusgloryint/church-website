"use client";

import { RoadmapStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: RoadmapStatus;
}

const statusConfig: Record<
  RoadmapStatus,
  { label: string; bgColor: string; textColor: string }
> = {
  planned: {
    label: "Planned",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  in_progress: {
    label: "In Progress",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-300",
  },
  completed: {
    label: "Completed",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
  cancelled: {
    label: "Cancelled",
    bgColor: "bg-gray-100 dark:bg-gray-800",
    textColor: "text-gray-500 dark:text-gray-400",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
    >
      {config.label}
    </span>
  );
}
