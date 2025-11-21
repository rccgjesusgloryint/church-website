"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "./galley-grid";
import { useEventMedia } from "@/hooks/useEventMedia";

const INITIAL_VISIBLE = 8;

const Gallery = () => {
  const { events, loading } = useEventMedia();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, events.length));
  };

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
            <GalleryGrid events={events} visibleCount={visibleCount} />

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
    </div>
  );
};

export default Gallery;
