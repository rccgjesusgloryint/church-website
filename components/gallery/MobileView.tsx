import React from "react";

import { Key, useRef } from "react";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Image from "next/image";
import Link from "next/link";

const MobileView = () => {
  const carouselImgs: string[] = [
    "/images/carousel_img1.jpg",
    "/images/carousel_img2.jpg",
    "/images/carousel_img3.jpg",
    "/images/carousel_img4.jpg",
    "/images/carousel_img5.jpg",
    "/images/carousel_img6.jpg",
  ];

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="sm:hidden my-20 relative">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="px-3"
      >
        <CarouselContent>
          {carouselImgs.map((image: string, index: Key) => {
            return (
              <CarouselItem key={index}>
                <Image
                  src={image}
                  alt={`carousel_img${1}`}
                  width={500}
                  height={500}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MobileView;
