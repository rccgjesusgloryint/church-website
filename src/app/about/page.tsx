import React from "react";
import Navbar2 from "../../../components/Navbar2";
import Image from "next/image";
import Arrow from "../../../components/icons/Arrow";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <>
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar2 />
        <div className="h-full flex justify-center">
          <div className="flex items-center justify-center">
            <h1 className="text-white font-bold sm:text-[80px] text-[35px]">
              About Our Church
            </h1>
          </div>
        </div>
      </section>
      <section className="h-screen w-full relative border-b-2 border-black">
        <div className="grid-cols-12 grid-rows-12 grid h-full gap-5">
          <div className="row-end-3 row-span-1 col-start-2 col-span-2 flex flex-col items-start justify-end">
            <h3 className="tracking-widest">CHURCH OFFICERS</h3>
            <div className="bg-black opacity-55 w-[163px] h-[1px] mt-1 mb-0"></div>
          </div>
          <div className="row-start-3 row-span-1 col-start-2 col-span-7 flex flex-col items-start justify-start">
            <h1 className="font-bold text-[40px]">
              Meet Our Wonderful Church Leaders
            </h1>
          </div>
          <div className="col-start-10 col-span-3 row-start-3 row-span-1 flex items-end">
            <div className="flex items-center gap-3 font-bold hover:opacity-55 transition-opacity ease-in-out duration-500 cursor-pointer">
              <Link href="/">VIEW ALL PASTORS</Link>
              <Arrow />
            </div>
          </div>
          <div className="col-start-2 col-span-10 row-start-6 flex flex-row justify-between flex-wrap gap-5">
            <div className="w-[273px] h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
              <h1>Full Name</h1>
              <h3>Title</h3>
            </div>
            <div className="w-[273px] h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
              <h1>Full Name</h1>
              <h3>Title</h3>
            </div>
            <div className="w-[273px] h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
              <h1>Full Name</h1>
              <h3>Title</h3>
            </div>
            <div className="w-[273px] h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
              <h1>Full Name</h1>
              <h3>Title</h3>
            </div>
          </div>
        </div>
        {/* <div className="w-full h-[284px] bg-slate-600 absolute"></div> */}
      </section>
      <section className="h-full w-full">
        {/* <GridLayout fill={true} cls={12} sides={20} type="rows" /> */}
        {/* <GridLayout fill={true} cls={12} sides={20} type="cols" /> */}
        <div className="grid-cols-12 grid-rows-12 grid h-full gap-5">
          <div className="row-start-1 row-span-1 col-start-2 col-span-2 flex flex-col items-start justify-end">
            <h3 className="tracking-widest">CHURCH OFFICERS</h3>
            <div className="bg-black opacity-55 w-[163px] h-[1px] mt-1 mb-0"></div>
          </div>
          <div className="row-start-2 row-span-1 col-start-2 col-span-7 flex flex-col items-start justify-start">
            <h1 className="font-bold text-[40px]">
              Meet Our Wonderful Church Leaders
            </h1>
          </div>
        </div>
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
};

export default About;
