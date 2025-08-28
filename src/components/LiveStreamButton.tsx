"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { isLive } from "@/lib/queries";

export default function LiveStreamButton({
  channelUrl,
}: {
  channelUrl: string;
}) {
  const [live, setIsLive] = useState(false);

  useEffect(() => {
    const check = async () => {
      const result = await isLive();
      // console.log("🎥 isLive result: ", result);
      setIsLive(result);
    };

    check();
    const interval = setInterval(check, 900000);
    return () => clearInterval(interval);
  }, []);

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
