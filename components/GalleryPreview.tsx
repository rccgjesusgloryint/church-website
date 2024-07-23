"use client";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "./global/custom-modal";
import { getTrackedEvent, trackEvent } from "@/lib/queries";
import { getTraceEvents } from "next/dist/trace";
import { trackEventCall } from "@/lib/actions";

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

  const { setClose, setOpen } = useModal();

  const viewAllBtn = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  const handleViewGalleryClick = async () => {
    const event = await getTrackedEvent("View Gallery");
    const event_calls = event ? event.event_calls : 0;
    await trackEvent("View Gallery", event_calls);
  };

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
    <section className="h-full w-screen relative">
      <div className="py-[10%] p-0 m-0 sm:flex flex-col hidden">
        <div className="flex flex-rows w-full h-[500px] gap-10 mb-10">
          <div className="w-1/4 cursor-pointer">
            <Image
              src="/images/carousel_img1.jpg"
              alt="carousel_img1"
              className="bg-cover bg-center w-full h-full"
              width={1500}
              height={1200}
              onClick={() =>
                setOpen(
                  <CustomModal>
                    <Image
                      src={"/images/carousel_img1.jpg"}
                      alt="fullImage"
                      width={1500}
                      height={1200}
                    />
                  </CustomModal>
                )
              }
            />
          </div>
          <div className="w-1/4 h-full cursor-pointer">
            <Image
              src="/images/carousel_img2.jpg"
              alt="carousel_img2"
              className="bg-cover bg-center w-full h-full"
              width={800}
              height={800}
              onClick={() =>
                setOpen(
                  <CustomModal>
                    <Image
                      src={"/images/carousel_img2.jpg"}
                      alt="fullImage"
                      width={1500}
                      height={1200}
                    />
                  </CustomModal>
                )
              }
            />
          </div>
          <div className="w-2/4 h-full cursor-pointer">
            <Image
              src="/images/carousel_img3.jpg"
              alt="carousel_img3"
              className="bg-cover bg-center w-full h-full"
              width={1500}
              height={1200}
              onClick={() =>
                setOpen(
                  <CustomModal>
                    <Image
                      src={"/images/carousel_img3.jpg"}
                      alt="fullImage"
                      width={1500}
                      height={1200}
                    />
                  </CustomModal>
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-rows w-full h-[500px] gap-10">
          <div className="w-2/4 h-full bg-cover bg-bottom cursor-pointer">
            <Image
              src="/images/carousel_img5.jpg"
              alt="carousel_img5"
              className="bg-cover bg-center w-full h-full"
              width={1500}
              height={1200}
              onClick={() =>
                setOpen(
                  <CustomModal>
                    <Image
                      src={"/images/carousel_img5.jpg"}
                      alt="fullImage"
                      width={1500}
                      height={1200}
                    />
                  </CustomModal>
                )
              }
            />
          </div>
          <div className="w-1/4 h-full cursor-pointer">
            <Image
              src="/images/carousel_img4.jpg"
              alt="carousel_img3"
              className="bg-cover bg-center w-full h-full"
              width={1500}
              height={1200}
              onClick={() =>
                setOpen(
                  <CustomModal>
                    <Image
                      src={"/images/carousel_img4.jpg"}
                      alt="fullImage"
                      width={1500}
                      height={1200}
                    />
                  </CustomModal>
                )
              }
            />
          </div>
          <div className="bg-carousel-img6 w-1/4 h-full cursor-pointer">
            <Image
              src="/images/carousel_img6.jpg"
              alt="carousel_img6"
              className="bg-cover bg-center w-full h-full"
              width={1500}
              height={1200}
              onClick={() =>
                setOpen(
                  <CustomModal>
                    <Image
                      src={"/images/carousel_img6.jpg"}
                      alt="fullImage"
                      width={1500}
                      height={1200}
                    />
                  </CustomModal>
                )
              }
            />
          </div>
        </div>
        <Link href="/gallery" onClick={() => trackEventCall("View Gallery")}>
          <div
            className="flex flex-row items-center gap-3 justify-end pr-12 cursor-pointer absolute right-5 xl:bottom-20 lg:bottom-14 bottom-5"
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
          <div className="flex flex-row items-center gap-3 justify-end pr-12 cursor-pointer absolute right-5 bottom-20 mt-1">
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
