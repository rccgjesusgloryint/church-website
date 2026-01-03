"use client";

import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SermonsPage from "..";

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
        <Navbar />
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
          <SermonsPage />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
