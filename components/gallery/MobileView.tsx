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
import { CarosoulImageType } from "@/lib/types";

type Props = {
  images: CarosoulImageType[];
  isLoading: boolean;
};

const MobileView = ({ images, isLoading }: Props) => {
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
          {!isLoading &&
            images.map((image) => {
              return (
                <CarouselItem key={image.id}>
                  <Image
                    src={image.link}
                    alt={image.name}
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
