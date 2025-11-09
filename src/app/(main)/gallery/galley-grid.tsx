"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { EventsMedia } from "@/lib/types";

interface GalleryGridProps {
  visibleCount: number;
  events: EventsMedia[]; // ← NEW: pass EventMedia[]
  onEventClick: (eventName: string) => void; // ← renamed for clarity
}

const PREVIEW_FALLBACK =
  "https://preview-church-gallery-design-kzmm4h729y5io3uypyzz.vusercontent.net/placeholder.svg";

// Tiny shimmer SVG for blurDataURL
const shimmer = (w: number, h: number) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#e5e7eb" offset="20%" />
          <stop stop-color="#f3f4f6" offset="50%" />
          <stop stop-color="#e5e7eb" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#e5e7eb" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`
  ).toString("base64")}`;

export function GalleryGrid({
  events,
  onEventClick,
  visibleCount,
}: GalleryGridProps) {
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const [errored, setErrored] = useState<Set<string>>(new Set());

  // Build items once: one card per event with a cover image
  const items = useMemo(() => {
    return events.slice(0, visibleCount).map((ev) => {
      const cover = ev.images?.[0] || PREVIEW_FALLBACK;
      const dateObj = ev.date instanceof Date ? ev.date : new Date(ev.date);
      return {
        id: String(ev.id ?? ev.event),
        event: ev.event,
        date: isNaN(dateObj.getTime()) ? null : dateObj,
        cover,
      };
    });
  }, [events, visibleCount]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {items.map((item, i) => {
          const isAboveFold = i < 6;
          const isLoaded = loaded.has(item.id);
          const isErrored = errored.has(item.id);

          const src = isErrored ? PREVIEW_FALLBACK : item.cover;

          return (
            <Card
              key={item.id}
              className="break-inside-avoid cursor-pointer group hover:shadow-lg transition-all duration-300 overflow-hidden"
              onClick={() => onEventClick(item.event)}
            >
              <div className="relative">
                {/* Aspect ratio wrapper */}
                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}

                  <Image
                    src={src}
                    alt={item.event}
                    fill
                    className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={isAboveFold}
                    loading={isAboveFold ? "eager" : "lazy"}
                    fetchPriority={isAboveFold ? "high" : "auto"}
                    decoding="async"
                    placeholder="blur"
                    blurDataURL={shimmer(16, 12)}
                    onLoadingComplete={() =>
                      setLoaded((prev) => new Set(prev).add(item.id))
                    }
                    onError={() =>
                      setErrored((prev) => new Set(prev).add(item.id))
                    }
                  />
                </div>

                {/* Meta */}
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 text-balance">
                    {item.event}
                  </h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {item.date
                          ? item.date.toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
