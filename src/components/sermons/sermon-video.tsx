"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Card } from "@/components/ui/card";
import { getYoutubeVidId } from "@/lib/actions";

interface SermonVideoProps {
  videoUrl: string;
  title: string;
}

export interface SermonVideoRef {
  seekTo: (seconds: number) => void;
}

export const SermonVideo = forwardRef<SermonVideoRef, SermonVideoProps>(
  ({ videoUrl, title }, ref) => {
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoId = getYoutubeVidId(videoUrl);

    // Expose seekTo method to parent components
    useImperativeHandle(ref, () => ({
      seekTo: (seconds: number) => {
        if (playerRef.current && playerRef.current.seekTo) {
          playerRef.current.seekTo(seconds, true);
          // Optionally play the video after seeking
          playerRef.current.playVideo();
        }
      },
    }));

    useEffect(() => {
      if (!videoId) return;

      // Load the YouTube IFrame API script if not already loaded
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // Set up callback for when API is ready
        window.onYouTubeIframeAPIReady = () => {
          initializePlayer();
        };
      } else if (window.YT.Player) {
        // API is already loaded
        initializePlayer();
      }

      function initializePlayer() {
        if (!containerRef.current) return;

        // Create a div for the player
        const playerDiv = document.createElement("div");
        playerDiv.id = `youtube-player-${videoId}`;
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(playerDiv);

        playerRef.current = new window.YT.Player(playerDiv, {
          videoId: videoId,
          playerVars: {
            enablejsapi: 1,
            origin: window.location.origin,
            rel: 0, // Don't show related videos from other channels
          },
          events: {
            onReady: (event) => {
              // Player is ready
              console.log("YouTube player ready");
            },
            onError: (event) => {
              console.error("YouTube player error:", event.data);
            },
          },
        });
      }

      // Cleanup
      return () => {
        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy();
        }
      };
    }, [videoId]);

    return (
      <Card className="overflow-hidden border-border bg-card">
        <div className="relative aspect-video w-full">
          <div
            ref={containerRef}
            className="w-full h-full absolute inset-0"
            aria-label={`YouTube video player: ${title}`}
          />
        </div>
      </Card>
    );
  }
);

SermonVideo.displayName = "SermonVideo";
