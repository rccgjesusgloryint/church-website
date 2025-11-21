"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Images } from "lucide-react";
import { GalleryHeader } from "@/components/gallery/gallery-header";
import { ShareButtons } from "@/components/sermons/share-buttons";
import { GalleryCarousel } from "@/components/gallery/gallery-carousel";
import { EventsMedia } from "@/lib/types";

interface EventGalleryClientProps {
  event: EventsMedia;
  galleryUrl: string;
}

export function EventGalleryClient({
  event,
  galleryUrl,
}: EventGalleryClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // Limit displayed images to 5 for better performance and UX
  const PREVIEW_LIMIT = 4;
  const displayedImages = event.images.slice(0, PREVIEW_LIMIT);
  const hasMoreImages = event.images.length > PREVIEW_LIMIT;
  const remainingCount = event.images.length - PREVIEW_LIMIT;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseCarousel = () => {
    setSelectedImageIndex(null);
  };

  const handleViewAll = () => {
    setSelectedImageIndex(0); // Open carousel at first image
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/gallery">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>

          {/* Header Section */}
          <GalleryHeader event={event} />

          <div className="mt-8 space-y-6">
            {/* Gallery Grid - Show only first 5 images */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={image}
                    alt={`${event.event} - Photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>

            {/* View All Button - Show if more than 5 images */}
            {hasMoreImages && (
              <div className="flex justify-center pt-4">
                <Button onClick={handleViewAll} size="lg" variant="default">
                  <Images className="h-5 w-5 mr-2" />
                  View All {event.images.length} Photos in Carousel
                  <span className="ml-2 text-sm opacity-80">
                    (+{remainingCount} more)
                  </span>
                </Button>
              </div>
            )}

            {/* Share Section */}
            <ShareButtons
              title={event.event}
              url={galleryUrl}
              heading="Share this gallery"
            />
          </div>
        </div>
      </div>

      {/* Full-Page Carousel */}
      {selectedImageIndex !== null && (
        <GalleryCarousel
          images={event.images}
          eventName={event.event}
          initialIndex={selectedImageIndex}
          onClose={handleCloseCarousel}
        />
      )}
    </>
  );
}
