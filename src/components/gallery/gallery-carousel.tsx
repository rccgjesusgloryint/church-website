"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

const FALLBACK =
  "https://preview-church-gallery-design-kzmm4h729y5io3uypyzz.vusercontent.net/placeholder.svg";

interface GalleryCarouselProps {
  images: string[];
  eventName: string;
  initialIndex?: number;
  onClose?: () => void;
}

export function GalleryCarousel({
  images,
  eventName,
  initialIndex = 0,
  onClose,
}: GalleryCarouselProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const currentUrl = images[currentIndex] || FALLBACK;
  const prev = currentIndex > 0 ? images[currentIndex - 1] : null;
  const next =
    currentIndex < images.length - 1 ? images[currentIndex + 1] : null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        setCurrentIndex((i) => i + 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [currentIndex, images.length]);

  // Reset loading state when image changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentUrl]);

  return (
    <div className="fixed inset-0 bg-background z-50">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} of {images.length}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="text-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </header>

      {/* Main Image */}
      <div className="absolute inset-0 flex items-center justify-center p-16">
        <div className="relative h-full w-full">
          {isImageLoading && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}
          <Image
            key={currentUrl}
            src={currentUrl}
            alt={`${eventName} - Photo ${currentIndex + 1}`}
            fill
            priority
            unoptimized
            sizes="100vw"
            className={`object-contain transition-opacity duration-300 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsImageLoading(false)}
          />
        </div>

        {/* Preload adjacent images */}
        {prev && (
          <Image
            src={prev}
            alt=""
            width={1}
            height={1}
            className="hidden"
            loading="lazy"
            unoptimized
          />
        )}
        {next && (
          <Image
            src={next}
            alt=""
            width={1}
            height={1}
            className="hidden"
            loading="lazy"
            unoptimized
          />
        )}
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous image</span>
        </Button>
      )}
      {currentIndex < images.length - 1 && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next image</span>
        </Button>
      )}
    </div>
  );
}
