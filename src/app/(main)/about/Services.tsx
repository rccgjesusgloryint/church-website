"use client";

import React from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import ServiceCards from "./ServiceCards";

const Services = () => {
  const subTitle2 = React.useRef<HTMLElement | any>();
  const title3 = React.useRef<HTMLElement | any>();

  useGSAP(() => {
    gsap.from(subTitle2.current, {
      scrollTrigger: subTitle2.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(title3.current, {
      scrollTrigger: title3.current,
      x: -300,
      duration: 1.2,
      opacity: 0,
    });
  });

  return (
    <section className="h-auto w-full relative">
      <div className="absolute w-full h-[380px] bg-dark-gr z-[-10] top-0"></div>
      <div className="flex flex-col items-start px-5 mb-9">
        <div className="flex flex-col w-full mt-11 text-white">
          <div
            className="flex flex-col items-start justify-end"
            ref={subTitle2}
          >
            <h3 className="tracking-widest">POPULAR SERVICES</h3>
            <div className="bg-white opacity-55 w-[163px] h-[1px] mt-1 mb-0"></div>
          </div>
          <div
            className="flex flex-row items-center justify-start w-full relative"
            ref={title3}
          >
            <h1 className="font-bold sm:text-[40px] text-[30px]">
              Keeping Our Church Running Smoothly
            </h1>
          </div>
        </div>
        <ServiceCards />
      </div>
    </section>
  );
};

export default Services;
