"use client";

import Link from "next/link";

import { useCheckIsLive } from "@/hooks/useCheckLive";
import { getLastSundayOfTheMonthNumber } from "@/lib/actions";

export default function LiveStreamButton({
  channelUrl,
}: {
  channelUrl: string;
}) {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();

  const hours = date.getHours();
  const mins = date.getMinutes();

  const lastSunday = getLastSundayOfTheMonthNumber(
    date.getFullYear(),
    date.getMonth()
  );

  const { live } = useCheckIsLive({
    dayOfWeek,
    dayOfMonth,
    hours,
    mins,
    lastSunday,
  });

  if (!live) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={channelUrl}
        target="_blank"
        className="flex items-center gap-2 px-4 py-2 rounded-full text-white bg-red-600 shadow-lg animate-pulse hover:scale-105 transition-transform"
      >
        <span className="h-3 w-3 bg-white rounded-full animate-ping" />
        <span className="font-semibold">LIVE NOW</span>
      </Link>
    </div>
  );
}
