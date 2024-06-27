"use client";

import React from "react";
import { useState } from "react";
import Newsletter from "../../../../components/Newsletter";
import Navbar2 from "../../../../components/Navbar2";
import { getAllImages } from "@/lib/queries";
import Image from "next/image";

import useEmblaCarousel from "embla-carousel-react";
import EmblaCarousel from "../media/gallery-carousel";
import { EmblaOptionsType } from "embla-carousel";
import { GetAllImages } from "@/lib/types";

type CategoryType = string[];

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GetAllImages>();
  const [galleryCategories, setGalleryCat] = useState<CategoryType>([]);
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
    };

    fetchGalleryImages();
  }, []); // Empty dependency array ensures this runs only once

  // React.useEffect(() => {
  //   console.log("GALLERY IMAGES, ", galleryImages);
  //   console.log("GALLERY CATEGORIES, ", galleryCategories);
  // }, [galleryImages, galleryCategories]);

  return (
    <>
      <Navbar2 />
      <main className="py-8 flex flex-col gap-11">
        <h1 className="text-black text-4xl text-center">Gallery</h1>
        <div className="h-auto w-full">
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
                <h1 className="font-bold text-3xl">
                  SORRY NO IMAGES IN GALLERY YET!
                </h1>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Gallery;
