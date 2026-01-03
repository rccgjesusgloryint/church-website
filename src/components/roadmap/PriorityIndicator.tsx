"use client";

import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

interface PriorityIndicatorProps {
  priority: number;
}

const priorityConfig: Record<
  number,
  { label: string; icon: React.ReactNode; color: string }
> = {
  4: {
    label: "Urgent",
    icon: <FaArrowUp className="w-3 h-3" />,
    color: "text-red-500",
  },
  3: {
    label: "High",
    icon: <FaArrowUp className="w-3 h-3" />,
    color: "text-orange-500",
  },
  2: {
    label: "Medium",
    icon: null,
    color: "text-yellow-500",
  },
  1: {
    label: "Low",
    icon: <FaArrowDown className="w-3 h-3" />,
    color: "text-blue-400",
  },
  0: {
    label: "No priority",
    icon: null,
    color: "text-gray-400",
  },
};

export default function PriorityIndicator({
  priority,
}: PriorityIndicatorProps) {
  const config = priorityConfig[priority] ?? priorityConfig[0];

  return (
    <div className={`flex items-center gap-1 text-xs ${config.color}`}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}
