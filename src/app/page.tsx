"use client";

import { Key, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Button from "../../components/Button";
import AboutUsPreview from "../../components/AboutUsPreview";
import OurMinistries from "../../components/OurMinistries";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const text = useRef<HTMLElement | any>();
  const navbar = useRef<HTMLElement | any>();
  const btn = useRef<HTMLElement | any>();
  const AboutTxtL = useRef<HTMLElement | any>();
  const AboutTxtR = useRef<HTMLElement | any>();
  const ourMinistriesSubHeading = useRef<HTMLElement | any>();
  const ourMinistriesHeading = useRef<HTMLElement | any>();

  const carouselImgs: string[] = [
    "/images/carousel_img1.jpg",
    "/images/carousel_img2.jpg",
    "/images/carousel_img3.jpg",
    "/images/carousel_img4.jpg",
    "/images/carousel_img5.jpg",
    "/images/carousel_img6.jpg",
  ];

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(text.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
    gsap.from(navbar.current, {
      y: -30,
      duration: 1,
      opacity: 1,
    });
    gsap.from(btn.current, {
      y: 150,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
    gsap.from(AboutTxtL.current, {
      scrollTrigger: AboutTxtL.current,
      x: -80,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
    gsap.from(AboutTxtR.current, {
      scrollTrigger: AboutTxtL.current,
      x: 80,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
    gsap.from(ourMinistriesSubHeading.current, {
      scrollTrigger: ourMinistriesSubHeading.current,
      x: -80,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
    gsap.from(ourMinistriesHeading.current, {
      scrollTrigger: ourMinistriesHeading.current,
      x: 80,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
  });

  return (
    <main>
      <section className="h-screen bg-home-bg bg-center bg-cover text-white">
        <div className="" ref={navbar}>
          <Navbar />
        </div>
        <div className="" ref={text}>
          <Hero />
        </div>
        <div
          className="btn flex flex-col justify-center items-center cursor-pointer"
          ref={btn}
        >
          <Button />
        </div>
      </section>
      <section className="flex flex-col sm:flex-row justify-center items-center bg-white h-[70vh] sm:h-[50vh]">
        <AboutUsPreview AboutTxtL={AboutTxtL} AboutTxtR={AboutTxtR} />
      </section>
      <section className="h-[230vh] sm:h-[125vh] 2xl:h-screen bg-our-ministries bg-center bg-cover">
        <OurMinistries
          ourMinistriesSubHeading={ourMinistriesSubHeading}
          ourMinistriesHeading={ourMinistriesHeading}
        />
      </section>
      <section className="sm:h-screen h-[60vh]">
        <div className="py-[10%] p-0 m-0 relative sm:block hidden">
          <div className="flex flex-rows w-full h-[500px] gap-10 mb-10">
            <div className="bg-carousel-img1 w-1/4 h-full bg-cover bg-center cursor-pointer"></div>
            <div className="bg-carousel-img2 w-1/4 h-full bg-cover bg-center cursor-pointer"></div>
            <div className="bg-carousel-img3 w-2/4 h-full bg-cover bg-center cursor-pointer"></div>
          </div>
          <div className="flex flex-rows w-full h-[500px] gap-10">
            <div className="bg-carousel-img5 w-2/4 h-full bg-cover bg-bottom cursor-pointer"></div>
            <div className="bg-carousel-img4 w-1/4 h-full bg-cover bg-center cursor-pointer"></div>
            <div className="bg-carousel-img6 w-1/4 h-full bg-cover bg-center cursor-pointer"></div>
          </div>
          <div className="flex flex-row items-center gap-3 justify-end pr-12 cursor-pointer absolute 2xl:bottom-32 right-3 bottom-20">
            <h2>VIEW ALL</h2>
            <Image
              src={"/images/arrow-icon.png"}
              alt="arrow-icon"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="sm:hidden mt-20">
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
      </section>
    </main>
  );
}

{
  /* <Dialog>
  <DialogTrigger className="flex flex-rows  w-full h-[500px] gap-10">
    <div className="bg-carousel-img5 w-2/4 h-full bg-cover bg-bottom cursor-pointer"></div>
  </DialogTrigger>
  <DialogContent>
    <Image
      src={"/images/carousel_img5.jpg"}
      alt="image"
      width={1000}
      height={1000}
    />
  </DialogContent>
</Dialog>; */
}
