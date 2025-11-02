"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

interface GalleryModalProps {
  image: string | null;
  filteredImages: string[];
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  title?: string;
  description?: string | null;
  subtitle?: string | null;
  date?: string | Date;
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
  // keyboard nav
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen || !image) return null;

  const idx = Math.max(0, filteredImages.indexOf(image));
  const len = filteredImages.length;
  const prev = idx > 0 ? filteredImages[idx - 1] : null;
  const next = idx < len - 1 ? filteredImages[idx + 1] : null;

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
      {/* Give the content a real layout instead of absolute stacking */}
      <DialogContent className="w-[min(92vw,1200px)] h-[90vh] p-0 overflow-hidden bg-background">
        <div className="grid h-full grid-rows-[auto,1fr,auto]">
          {/* Header row */}
          <header className="row-start-1 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <DialogTitle className="m-0 p-0 text-sm font-normal text-muted-foreground">
              {idx + 1} of {len}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </header>

          {/* Media row */}
          <section className="row-start-2 relative">
            {/* Centered image with padding so it never touches edges */}
            <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
              <div className="relative h-full w-full">
                <Image
                  src={image || FALLBACK}
                  alt={title || "Gallery image"}
                  fill
                  priority
                  sizes="(max-width: 768px) 92vw, 1200px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Preload neighbors (hidden, no layout impact) */}
            {prev && (
              <Image src={prev} alt="" width={1} height={1} className="hidden" priority />
            )}
            {next && (
              <Image src={next} alt="" width={1} height={1} className="hidden" priority />
            )}

            {/* Arrows stay inside the media row */}
            {idx > 0 && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground"
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
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground"
                onClick={onNext}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>
            )}
          </section>

          {/* Footer row */}
          <footer className="row-start-3 px-4 py-3 bg-card border-t border-border space-y-1">
            {title && (
              <h2 className="font-semibold text-base leading-snug text-foreground line-clamp-2">
                {title}
              </h2>
            )}
            {(description || dateLabel || subtitle) && (
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                {dateLabel && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {dateLabel}
                  </span>
                )}
                {subtitle && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {subtitle}
                  </span>
                )}
              </div>
            )}
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
            )}
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}
