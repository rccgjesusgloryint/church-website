"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { GalleryCategoryType, GetAllImages } from "@/lib/types";
import { CategorisedImages } from "@/hooks/useGalleryImages";

interface GalleryGridProps {
  visibleCount: number;
  categories: GalleryCategoryType;
  images: CategorisedImages;
  onImageClick: (category: string) => void;
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
  images,
  onImageClick,
  visibleCount,
}: GalleryGridProps) {
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const [errored, setErrored] = useState<Set<string>>(new Set());

  // Build a single array once; avoids repeated filtering and multiple lookups.
  const items = useMemo(() => {
    const arr: Array<{
      category: string;
      id: string;
      name: string;
      date: Date | null;
      link: string;
    }> = [];

    Array.from(images.keys)
      .slice(0, visibleCount)
      .forEach((category) => {
        const first = images.fullArray.find((img) => img?.name === category);
        if (!first) return;
        arr.push({
          category,
          id: first.id ?? category,
          name: first.name ?? category,
          date: first.date ?? null,
          link: first.link || PREVIEW_FALLBACK,
        });
      });

    return arr;
  }, [images, visibleCount]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {items?.map((item, i) => {
          const isAboveFold = i < 6; // eager-load just a few
          const isLoaded = loaded.has(item.id);
          const isErrored = errored.has(item.id);

          // Choose src: if image errored, show fallback
          const src = isErrored ? PREVIEW_FALLBACK : item.link;

          return (
            <Card
              key={item.id}
              className="break-inside-avoid cursor-pointer group hover:shadow-lg transition-all duration-300 overflow-hidden"
              onClick={() => onImageClick(item.category)}
            >
              <div className="relative">
                {/* Aspect-ratio wrapper to prevent CLS (change ratio to match your images) */}
                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  {/* Skeleton overlay (visible until loaded) */}
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}

                  <Image
                    src={src}
                    alt={item.name}
                    fill
                    className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    // Next/Image performance knobs:
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
                    {item.name}
                  </h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {item.date ? item.date.toUTCString().slice(0, -13) : ""}
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
