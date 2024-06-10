import React from "react";
import { Key, useRef } from "react";

import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const GalleryPreview = () => {
  const carouselImgs: string[] = [
    "/images/carousel_img1.jpg",
    "/images/carousel_img2.jpg",
    "/images/carousel_img3.jpg",
    "/images/carousel_img4.jpg",
    "/images/carousel_img5.jpg",
    "/images/carousel_img6.jpg",
  ];

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const viewAllBtn = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(viewAllBtn.current, {
      scrollTrigger: viewAllBtn.current,
      x: -50,
      duration: 1,
      opacity: 0,
      ease: "none",
    });
  });
  return (
    <section className="sm:h-[170vh] 2xl:h-[150vh] h-[60vh] overflow-clip">
      <div className="py-[10%] p-0 m-0 relative sm:block hidden">
        <div className="flex flex-rows w-full h-[500px] gap-10 mb-10">
          <div className="w-1/4 cursor-pointer">
            <Image
              src="/images/carousel_img1.jpg"
              alt="carousel_img1"
              className="bg-cover bg-center w-full h-full"
              width={800}
              height={800}
            />
          </div>
          <div className="w-1/4 h-full cursor-pointer">
            <Image
              src="/images/carousel_img2.jpg"
              alt="carousel_img2"
              className="bg-cover bg-center w-full h-full"
              width={800}
              height={800}
            />
          </div>
          <div className="w-2/4 h-fullcursor-pointer">
            <Image
              src="/images/carousel_img3.jpg"
              alt="carousel_img3"
              className="bg-cover bg-center w-full h-full"
              width={800}
              height={800}
            />
          </div>
        </div>
        <div className="flex flex-rows w-full h-[500px] gap-10">
          <div className="w-2/4 h-full bg-cover bg-bottom cursor-pointer">
            <Image
              src="/images/carousel_img5.jpg"
              alt="carousel_img5"
              className="bg-cover bg-center w-full h-full"
              width={800}
              height={800}
            />
          </div>
          <div className="w-1/4 h-full cursor-pointer">
            <Image
              src="/images/carousel_img4.jpg"
              alt="carousel_img3"
              className="bg-cover bg-center w-full h-full"
              width={800}
              height={800}
            />
          </div>
          <div className="bg-carousel-img6 w-1/4 h-full cursor-pointer">
            <Image
              src="/images/carousel_img6.jpg"
              alt="carousel_img6"
              className="bg-cover bg-center w-full h-full"
              width={800}
              height={800}
            />
          </div>
        </div>
        <Link href="/gallery">
          <div
            className="flex flex-row items-center gap-3 justify-end pr-12 cursor-pointer absolute 2xl:bottom-32 right-3 bottom-20"
            ref={viewAllBtn}
          >
            <h2>VIEW ALL</h2>
            <Image
              src={"/images/arrow-icon.png"}
              alt="arrow-icon"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </div>
      <div className="sm:hidden mt-20 relative">
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
        <Link href="/gallery">
          <div className="flex flex-row items-center gap-3 justify-end pr-12 cursor-pointer absolute sm:bottom-32 right-1 bottom-2 mt-1">
            <h2>VIEW ALL</h2>
            <Image
              src={"/images/arrow-icon.png"}
              alt="arrow-icon"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default GalleryPreview;
