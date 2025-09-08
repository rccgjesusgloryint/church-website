"use client";

import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "./galley-grid";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import { GalleryModal } from "./GalleryModal";

const Gallery = () => {
  const { images, categories, loaded } = useGalleryImages();

  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
    null
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const visibleImages = images.slice(0, visibleCount);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const previousIndex =
      currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[previousIndex]);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, images.length));
  };

  useEffect(() => {
    console.log("Images: ", images);
  }, [images]);

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
              images={visibleImages}
              onImageClick={handleImageClick}
            />

            {/* Load More Button */}
            {visibleCount < images.length && (
              <div className="text-center py-8">
                <Button onClick={loadMore} variant="outline" size="lg">
                  Load More Photos ({images.length - visibleCount} remaining)
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
        image={selectedImage}
        images={images}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default Gallery;
