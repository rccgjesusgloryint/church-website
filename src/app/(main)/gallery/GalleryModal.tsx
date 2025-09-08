"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  images: GetAllImages[];
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function GalleryModal({
  image,
  images,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: GalleryModalProps) {
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

  const currentIndex = images.findIndex((img) => img.id === image.id);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {images.length}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Image */}
          <div className="flex-1 relative flex items-center justify-center bg-muted/20">
            <Image
              src={image?.link || "/placeholder.svg"}
              alt={image.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />

            {/* Navigation buttons */}
            {!isFirst && (
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

            {!isLast && (
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
          </div>

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
                <span>{String(image.date)}</span>
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
