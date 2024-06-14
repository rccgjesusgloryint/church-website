"use client";

import React from "react";
import { useState } from "react";
import Newsletter from "../../../components/Newsletter";
import Navbar2 from "../../../components/Navbar2";
import { getAllImages } from "@/lib/queries";
import Image from "next/image";

import useEmblaCarousel from "embla-carousel-react";
import EmblaCarousel from "../media/gallery-carousel";
import { EmblaOptionsType } from "embla-carousel";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [emblaRef] = useEmblaCarousel();

  const OPTIONS: EmblaOptionsType = { loop: true, duration: 60 };

  React.useEffect(() => {
    const fetchGalleryImages = async () => {
      const response = await getAllImages();
      setGalleryImages(response);
    };
    fetchGalleryImages();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <Navbar2 />
      <main className="py-8 flex flex-col gap-11">
        <h1 className="text-black text-4xl text-center">Gallery</h1>
        <div className="h-auto w-full">
          <EmblaCarousel slides={galleryImages} options={OPTIONS} />
        </div>
      </main>
      <Newsletter />
      {/* <Footer /> */}
    </>
  );
};

export default Gallery;
