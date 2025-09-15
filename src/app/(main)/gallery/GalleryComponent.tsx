"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "./galley-grid";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import { GalleryModal } from "./GalleryModal";
import { GetAllImages } from "@/lib/types";
import { getCatImages } from "@/lib/actions";

// type CategorisedImages = {}[];

const Gallery = () => {
  const { images, catImages, categories } = useGalleryImages();

  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
    null
  );
  const [filteredImages, setFilteredImages] = useState<GetAllImages[]>([]);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const [index, setIndex] = useState(0);
  const loaded = useRef(new Set<number>()); // which slide URLs are fully loaded

  // 🔑 Track index within the *filtered* list the user is viewing
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = filteredImages[currentIndex] ?? null;

  const handleImageClick = (category: string) => {
    const list = getCatImages(category, catImages.fullArray);
    setFilteredImages(list);
    setCurrentIndex(0);
    setIsGalleryModalOpen(true);
  };

  const handleModalClose = () => {
    setIsGalleryModalOpen(false);
    setFilteredImages([]);
    setSelectedImage(null);
  };

  // ✅ Next/Prev operate on filteredImages, not the global images array
  const handleNext = () =>
    setCurrentIndex((i) => (i + 1) % (filteredImages.length || 1));
  const handlePrevious = () =>
    setCurrentIndex(
      (i) =>
        (i - 1 + (filteredImages.length || 1)) % (filteredImages.length || 1)
    );

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, images.length));
  };

  // 🎯 SIMPLE preload: warm the next & previous slide in the filtered set
  useEffect(() => {
    if (!isGalleryModalOpen || filteredImages.length === 0) return;
    const len = filteredImages.length;
    const next = filteredImages[(currentIndex + 1) % len]?.link;
    const prev = filteredImages[(currentIndex - 1 + len) % len]?.link;
    [next, prev].forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.decoding = "async";
      img.src = url;
    });
  }, [isGalleryModalOpen, filteredImages, currentIndex]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Camera className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-balance">
                Church Gallery
              </h1>
            </div>
          </div>
        </div>
      </header> */}

      {/* Gallery Grid */}
      <main>
        {images.length > 0 ? (
          <>
            <GalleryGrid
              categories={categories}
              images={catImages}
              onImageClick={handleImageClick}
              visibleCount={visibleCount}
            />

            {/* Load More Button */}
            {visibleCount < Array.from(catImages.keys).length && (
              <div className="text-center py-8">
                <Button onClick={loadMore} variant="outline" size="lg">
                  Load More Photos (
                  {Array.from(catImages.keys).length - visibleCount} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No photos in the church&apos;s Gallery
            </h3>
          </div>
        )}
      </main>

      {/* Lightbox */}
      <GalleryModal
        image={currentImage}
        filteredImages={filteredImages}
        isOpen={isGalleryModalOpen}
        onClose={handleModalClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default Gallery;
