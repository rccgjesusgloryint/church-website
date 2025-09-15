"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge"s
import { Calendar, MapPin, User } from "lucide-react";
import { GalleryCategoryType, GetAllImages } from "@/lib/types";
import { CategorisedImages } from "@/hooks/useGalleryImages";

interface GalleryGridProps {
  visibleCount: number;
  categories: GalleryCategoryType;
  images: CategorisedImages;
  onImageClick: (category: string) => void;
}

export function GalleryGrid({
  images,
  onImageClick,
  visibleCount,
}: GalleryGridProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const previewImage =
    "https://preview-church-gallery-design-kzmm4h729y5io3uypyzz.vusercontent.net/placeholder.svg";
  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  };

  // const getEventTypeColor = (eventType: string) => {
  //   const colors = {
  //     worship: "bg-primary/10 text-primary border-primary/20",
  //     community: "bg-secondary/10 text-secondary border-secondary/20",
  //     youth: "bg-accent/10 text-accent border-accent/20",
  //     outreach: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  //     special: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  //   };
  //   return (
  //     colors[eventType as keyof typeof colors] ||
  //     "bg-muted text-muted-foreground"
  //   );
  // };

  const getCatImages = (category: string) => {
    const fileredImages = images.fullArray.filter(
      (image) => image?.name === category
    );

    return fileredImages[0];
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {Array.from(images.keys)
          ?.slice(0, visibleCount)
          .map((category, i) => {
            const item = getCatImages(category);
            const isAboveFold = i < 6; // tweak as you like
            const id = item?.id ?? "";
            const link = item?.link || previewImage;
            return (
              <Card
                key={id || category}
                className="break-inside-avoid cursor-pointer group hover:shadow-lg transition-all duration-300 overflow-hidden"
                onClick={() => onImageClick(category)}
              >
                <div className="relative">
                  <div className="relative overflow-hidden">
                    <Image
                      src={link}
                      alt={item?.name || ""}
                      width={400}
                      height={300}
                      className={`w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 ${
                        loadedImages.has(id) ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(id)}
                      loading={isAboveFold ? "eager" : "lazy"}
                      priority={isAboveFold}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    {!loadedImages.has(id) && (
                      <div className="absolute inset-0 bg-muted animate-pulse" />
                    )}
                  </div>

                  {/* <div className="absolute top-2 left-2">
                <Badge variant="secondary" className={getEventTypeColor(image.eventType)}>
                  {image.eventType}
                </Badge>
              </div> */}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 text-balance">
                    {getCatImages(category)?.name}
                  </h3>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {getCatImages(category)
                          ?.date.toUTCString()
                          .slice(
                            0,
                            getCatImages(category)?.date.toUTCString().length -
                              13
                          )}
                      </span>
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
