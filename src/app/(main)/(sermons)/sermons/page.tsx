"use client";

import React from "react";
import Navbar2 from "../../../../../components/navbar/Navbar2";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Sermons } from "..";
import Footer from "../../../../../components/Footer";

const Page = () => {
  const useTitle = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(useTitle.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
  });

  return (
    <>
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar2 />
        <div className="h-full flex justify-center items-center">
          <h1
            className="text-white font-bold sm:text-[80px] text-[35px]"
            ref={useTitle}
          >
            Sermons
          </h1>
        </div>
      </section>
      <section className="h-auto w-full relative">
        <div className="flex flex-col w-full">
          <Sermons />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
