"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge"s
import { Calendar, MapPin, User } from "lucide-react";
import { GalleryCategoryType, GetAllImages } from "@/lib/types";

interface GalleryGridProps {
  categories: GalleryCategoryType;
  images: GetAllImages[];
  onImageClick: (image: GetAllImages) => void;
}

export function GalleryGrid({
  images,
  categories,
  onImageClick,
}: GalleryGridProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  };

  const getEventTypeColor = (eventType: string) => {
    const colors = {
      worship: "bg-primary/10 text-primary border-primary/20",
      community: "bg-secondary/10 text-secondary border-secondary/20",
      youth: "bg-accent/10 text-accent border-accent/20",
      outreach: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      special: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    };
    return (
      colors[eventType as keyof typeof colors] ||
      "bg-muted text-muted-foreground"
    );
  };

  const getPlaceholderImage = (category: string) => {
    const fileredImages = images.filter((image) => image.name === category);

    return fileredImages[0];
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {categories?.map((category) => (
          <Card
            key={category}
            className="break-inside-avoid cursor-pointer group hover:shadow-lg transition-all duration-300 overflow-hidden"
            onClick={() => onImageClick(getPlaceholderImage(category))}
          >
            <div className="relative">
              <div className="relative overflow-hidden">
                <Image
                  src={
                    getPlaceholderImage(category)?.link || "/placeholder.svg"
                  }
                  alt={getPlaceholderImage(category).name}
                  width={400}
                  height={300}
                  className={`w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 ${
                    loadedImages.has(getPlaceholderImage(category).id)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  onLoad={() =>
                    handleImageLoad(getPlaceholderImage(category).id)
                  }
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                {!loadedImages.has(getPlaceholderImage(category).id) && (
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
                {getPlaceholderImage(category).name}
              </h3>

              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {getPlaceholderImage(category).date.toISOString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
