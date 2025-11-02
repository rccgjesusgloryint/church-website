"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "./galley-grid"; // expects categories + onImageClick
import { GalleryModal } from "./GalleryModal";
import { useEventMedia } from "@/hooks/useEventMedia";
import type { EventsMedia } from "@/lib/types";

const INITIAL_VISIBLE = 8;

const Gallery = () => {
  const { events, loading } = useEventMedia();

  // for the grid pagination
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Modal state
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventsMedia | null>(null);

  // Within an event’s images[]
  const [currentIndex, setCurrentIndex] = useState(0);
  const loaded = useRef(new Set<number>());

  // Build the category list (event names)
  const categories = useMemo(() => events.map((e) => e.event), [events]);

  // Current URL to show in the modal
  const currentUrl =
    selectedEvent && selectedEvent.images.length > 0
      ? selectedEvent.images[currentIndex]
      : null;

  const handleCategoryClick = (eventName: string) => {
    const ev = events.find((e) => e.event === eventName) || null;
    setSelectedEvent(ev);
    setCurrentIndex(0);
    setIsGalleryModalOpen(!!ev);
  };

  const handleModalClose = () => {
    setIsGalleryModalOpen(false);
    setSelectedEvent(null);
    setCurrentIndex(0);
  };

  // next/prev inside the selected event’s images array
  const handleNext = () => {
    if (!selectedEvent) return;
    const len = selectedEvent.images.length || 1;
    setCurrentIndex((i) => (i + 1) % len);
  };
  const handlePrevious = () => {
    if (!selectedEvent) return;
    const len = selectedEvent.images.length || 1;
    setCurrentIndex((i) => (i - 1 + len) % len);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, events.length));
  };

  // Preload next/prev image URLs for smoother modal nav
  useEffect(() => {
    if (
      !isGalleryModalOpen ||
      !selectedEvent ||
      selectedEvent.images.length === 0
    )
      return;
    const len = selectedEvent.images.length;
    const next = selectedEvent.images[(currentIndex + 1) % len];
    const prev = selectedEvent.images[(currentIndex - 1 + len) % len];
    [next, prev].forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.decoding = "async";
      img.src = url;
    });
  }, [isGalleryModalOpen, selectedEvent, currentIndex]);

  return (
    <div className="min-h-screen bg-background">
      <main>
        {loading ? (
          <div className="text-center py-16">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Loading gallery…</h3>
          </div>
        ) : events && events.length > 0 ? (
          <>
            <GalleryGrid
              // You might want to pass richer items (cover image, count, date).
              // If your GalleryGrid only needs names + click handler, this is enough:
              events={events}
              onEventClick={handleCategoryClick}
              visibleCount={visibleCount}
            />

            {visibleCount < events.length && (
              <div className="text-center py-8">
                <Button onClick={loadMore} variant="outline" size="lg">
                  Load More Events ({events.length - visibleCount} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No events in the gallery yet
            </h3>
          </div>
        )}
      </main>

      <GalleryModal
        image={currentUrl} // string | null
        filteredImages={selectedEvent?.images ?? []} // string[]
        isOpen={isGalleryModalOpen}
        onClose={handleModalClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
        title={selectedEvent?.event}
        subtitle={selectedEvent?.location ?? null}
        description={selectedEvent?.description ?? null}
        date={selectedEvent?.date}
      />
    </div>
  );
};

export default Gallery;
