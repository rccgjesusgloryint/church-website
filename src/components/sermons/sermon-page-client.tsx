"use client";

import { useRef } from "react";
import { SermonVideo, SermonVideoRef } from "./sermon-video";
import { SermonAIFeatures } from "./sermon-ai-features";
import type { Sermon } from "@/lib/types";

interface SermonPageClientProps {
  sermon: Sermon;
}

export function SermonPageClient({ sermon }: SermonPageClientProps) {
  const videoPlayerRef = useRef<SermonVideoRef>(null);

  const handleTimestampClick = (seconds: number) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(seconds);
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* Video Player */}
      <div className="w-full lg:w-1/2 relative">
        <SermonVideo
          ref={videoPlayerRef}
          videoUrl={sermon.videoUrl}
          title={sermon.sermonTitle}
        />
      </div>

      {/* AI Features - Same width as video */}
      <div className="w-full lg:w-1/2">
        <SermonAIFeatures
          sermonId={Number(sermon.id)}
          sermonTitle={sermon.sermonTitle}
          summary={sermon.summary}
          aiBreakdown={sermon.aiBreakdown}
          videoUrl={sermon.videoUrl}
          onTimestampClick={handleTimestampClick}
        />
      </div>
    </div>
  );
}
