"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

interface GalleryModalProps {
  /** Current image URL (from the selected event’s images[]) */
  image: string | null;
  /** All image URLs for the selected event */
  filteredImages: string[];
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;

  /** Optional metadata for footer */
  title?: string; // event name
  description?: string | null;
  subtitle?: string | null; // e.g., location
  date?: string | Date; // event date
}

const FALLBACK =
  "https://preview-church-gallery-design-kzmm4h729y5io3uypyzz.vusercontent.net/placeholder.svg";

export function GalleryModal({
  image,
  filteredImages,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  title,
  description,
  subtitle,
  date,
}: GalleryModalProps) {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
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

  if (!isOpen || !image) return null;

  // Figure out current index by URL (works for your images:string[])
  const idx = Math.max(0, filteredImages.indexOf(image));
  const len = filteredImages.length;

  const prev = idx > 0 ? filteredImages[idx - 1] : null;
  const next = idx < len - 1 ? filteredImages[idx + 1] : null;

  // Keep sizes stable so Next/Image reuses optimizer variants
  const sizes = "100vw";

  // Preload prev/next via hidden Image components
  const PreloadImage = ({ src }: { src: string }) => (
    <div className="absolute inset-0 opacity-0 pointer-events-none" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        loading="eager"
        fetchPriority="low"
        style={{ objectFit: "contain" }}
        unoptimized
      />
    </div>
  );

  const dateLabel = (() => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  })();

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

          {/* Preload neighbors */}
          {prev && <PreloadImage src={prev} />}
          {next && <PreloadImage src={next} />}

          {/* Current */}
          <div className="absolute inset-0">
            <Image
              src={image || FALLBACK}
              alt={title || "Gallery image"}
              fill
              sizes={sizes}
              priority
              fetchPriority="high"
              loading="eager"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Navigation */}
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
          <div className="mt-auto bg-card border-t border-border p-4 space-y-2">
            {title && (
              <h2 className="font-semibold text-lg text-balance">{title}</h2>
            )}

            {(description || dateLabel || subtitle) && (
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {dateLabel && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{dateLabel}</span>
                  </div>
                )}
                {subtitle && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{subtitle}</span>
                  </div>
                )}
              </div>
            )}

            {description && (
              <p className="text-sm text-muted-foreground text-pretty">
                {description}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
