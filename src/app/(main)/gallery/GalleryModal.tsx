"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import { GetAllImages } from "@/lib/types";

interface GalleryModalProps {
  image: GetAllImages | null;
  filteredImages: GetAllImages[];
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function GalleryModal({
  image,
  filteredImages,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: GalleryModalProps) {
  const urlBreakDown = image?.link.split("/");
  const imageLength = image?.link.length;
  const APP_ID = "kwt4fjtfgo";
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!image) return null;

  const idx = Math.max(
    0,
    filteredImages.findIndex((img) => img.id === image.id)
  );
  const len = filteredImages.length;

  // Non-circular (like your UI): only render neighbor if it exists
  const prev = idx > 0 ? filteredImages[idx - 1] : null;
  const next = idx < len - 1 ? filteredImages[idx + 1] : null;

  // Keep sizes stable so the same optimizer variant is reused
  const sizes = "100vw";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <DialogTitle className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {idx + 1} of {len}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogTitle>
          {/* PREV (hidden but fetched by next/image) */}
          {prev && (
            <div
              className="absolute inset-0 opacity-0 pointer-events-none"
              aria-hidden
            >
              <Image
                src={prev.link}
                alt={prev.name ?? ""}
                fill
                sizes={sizes}
                loading="eager" // force fetch now
                fetchPriority="low"
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
          )}

          {/* CURRENT */}
          <div className="absolute inset-0">
            <Image
              src={
                image.link ||
                "https://preview-church-gallery-design-kzmm4h729y5io3uypyzz.vusercontent.net/placeholder.svg"
              }
              alt={image.name ?? ""}
              fill
              sizes={sizes}
              priority // preload current
              fetchPriority="high"
              loading="eager"
              style={{ objectFit: "contain" }}
              // unoptimized
            />
          </div>

          {/* NEXT (hidden but fetched by next/image) */}
          {next && (
            <div
              className="absolute inset-0 opacity-0 pointer-events-none"
              aria-hidden
            >
              <Image
                src={next.link}
                alt={next.name ?? ""}
                fill
                sizes={sizes}
                loading="eager" // force fetch now
                fetchPriority="low"
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
          )}
          {/* Navigation buttons */}
          {idx > 0 && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
          )}

          {idx < len - 1 && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={onNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          )}

          {/* Footer */}
          <div className="bg-card border-t border-border p-4">
            <h2 className="font-semibold text-lg mb-2 text-balance">
              {image.name}
            </h2>

            {/* {image.caption && (
              <p className="text-sm text-muted-foreground mb-3 text-pretty">
                {image.caption}
              </p>
            )} */}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {image?.date
                    .toUTCString()
                    .slice(0, image?.date.toUTCString().length - 13)}
                </span>
              </div>

              {/* {image.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{image.location}</span>
                </div>
              )} */}

              {/* {image.photographer && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Photo by {image.photographer}</span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
