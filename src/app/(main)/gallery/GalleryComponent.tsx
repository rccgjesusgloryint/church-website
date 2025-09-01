"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Camera, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "./galley-grid";
import { getAllImages } from "@/lib/queries";
import { GetAllImages } from "@/lib/types";
import { useGalleryImages } from "@/hooks/useGalleryImages";

const sampleImages = [
  {
    id: "1",
    src: "/church-worship-service-with-congregation-singing.png",
    alt: "Sunday worship service with congregation singing",
    title: "Sunday Morning Worship",
    date: "December 15, 2024",
  },
  {
    id: "2",
    src: "/church-community-potluck-dinner-families-eating-to.png",
    alt: "Community potluck dinner with families",
    title: "Community Potluck Dinner",
    date: "December 10, 2024",
  },
  {
    id: "3",
    src: "/youth-group-playing-games-and-laughing-together.png",
    alt: "Youth group activities and games",
    title: "Youth Game Night",
    date: "December 8, 2024",
  },
  {
    id: "4",
    src: "/images/gallery/outreach-1.png",
    alt: "Volunteers serving at community outreach",
    title: "Community Food Drive",
    date: "December 5, 2024",
  },
  {
    id: "5",
    src: "/church-christmas-pageant-children-in-costumes-nati.png",
    alt: "Christmas pageant with children",
    title: "Christmas Pageant",
    date: "December 20, 2024",
  },
  {
    id: "6",
    src: "/church-baptism-ceremony-water-baptism-celebration.png",
    alt: "Baptism ceremony celebration",
    title: "Baptism Sunday",
    date: "November 28, 2024",
  },
  {
    id: "7",
    src: "/church-small-group-bible-study-people-discussing-a.png",
    alt: "Small group Bible study discussion",
    title: "Small Group Bible Study",
    date: "December 12, 2024",
  },
  {
    id: "8",
    src: "/church-youth-mission-trip-volunteers-helping-commu.png",
    alt: "Youth mission trip volunteers",
    title: "Youth Mission Trip",
    date: "November 15, 2024",
  },
  {
    id: "9",
    src: "/church-youth-mission-trip-volunteers-helping-commu.png",
    alt: "Youth mission trip volunteers",
    title: "Youth Mission Trip",
    date: "November 15, 2024",
  },
  {
    id: "10",
    src: "/church-youth-mission-trip-volunteers-helping-commu.png",
    alt: "Youth mission trip volunteers",
    title: "Youth Mission Trip",
    date: "November 15, 2024",
  },
  {
    id: "11",
    src: "/church-youth-mission-trip-volunteers-helping-commu.png",
    alt: "Youth mission trip volunteers",
    title: "Youth Mission Trip",
    date: "November 15, 2024",
  },
  {
    id: "12",
    src: "/church-youth-mission-trip-volunteers-helping-commu.png",
    alt: "Youth mission trip volunteers",
    title: "Youth Mission Trip",
    date: "November 15, 2024",
  },
  {
    id: "13",
    src: "/church-youth-mission-trip-volunteers-helping-commu.png",
    alt: "Youth mission trip volunteers",
    title: "Youth Mission Trip",
    date: "November 15, 2024",
  },
];

const Gallery = () => {
  const { images, categories, loaded } = useGalleryImages();

  const [selectedImage, setSelectedImage] = useState<
    (typeof sampleImages)[0] | null
  >(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const visibleImages = sampleImages.slice(0, visibleCount);

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
    const currentIndex = sampleImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % sampleImages.length;
    setSelectedImage(sampleImages[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = sampleImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const previousIndex =
      currentIndex === 0 ? sampleImages.length - 1 : currentIndex - 1;
    setSelectedImage(sampleImages[previousIndex]);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, sampleImages.length));
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
              images={images}
              onImageClick={handleImageClick}
            />

            {/* Load More Button */}
            {visibleCount < images.length && (
              <div className="text-center py-8">
                <Button onClick={loadMore} variant="outline" size="lg">
                  Load More Photos ({sampleImages.length - visibleCount}{" "}
                  remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No photos found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms to find more photos.
            </p>
          </div>
        )}
      </main>

      {/* Lightbox */}
      {/* <GalleryLightbox
        image={selectedImage}
        images={sampleImages}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      /> */}
    </div>
  );
};

export default Gallery;
