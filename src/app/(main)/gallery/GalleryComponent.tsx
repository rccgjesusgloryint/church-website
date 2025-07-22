"use client";

import React, { useState } from "react";

import { getAllImages } from "@/lib/queries";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { GetAllImages } from "@/lib/types";
import EmblaCarousel from "../../../../components/gallery/gallery-carousel";
import Loader from "../../../../components/Loader";
import Footer from "../../../../components/Footer";

type Props = {};

type CategoryType = string[];

const GalleryComponent = (props: Props) => {
  const [galleryImages, setGalleryImages] = useState<GetAllImages>();
  const [galleryCategories, setGalleryCat] = useState<CategoryType>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef] = useEmblaCarousel();

  const OPTIONS: EmblaOptionsType = { loop: true, duration: 60 };

  React.useEffect(() => {
    const fetchGalleryImages = async () => {
      const response = await getAllImages();
      setGalleryImages(response);

      const categories = Array.from(
        new Set(response.map((image) => image.name))
      );
      setGalleryCat(categories);
      setIsLoading(false);
    };

    fetchGalleryImages();
  }, []);
  return (
    <main className="flex flex-col gap-11 relative">
      <div className="h-auto w-full mt-11">
        {isLoading ? (
          <div className="flex items-center justify-center mt-10">
            <Loader />
          </div>
        ) : (
          <div>
            {galleryCategories.length > 0 ? (
              galleryCategories.map((category) => {
                const filteredImages = galleryImages?.filter(
                  (image) => image.name === category
                );

                return (
                  <div key={category} className="mb-8">
                    <h2 className="text-2xl text-left mb-4">{category}</h2>
                    <EmblaCarousel slides={filteredImages} options={OPTIONS} />
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center">
                <h1 className="font-bold text-3xl text-center">
                  SORRY NO IMAGES IN GALLERY YET!
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default GalleryComponent;
