"use client";

import React from "react";
import Navbar2 from "../../../../components/navbar/Navbar2";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Services from "./Services";
import Leaders from "./Leaders";
import Newsletter from "../../../../components/Newsletter";
import Footer from "../../../../components/Footer";

const About = () => {
  const title = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(title.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
  });

  return (
    <>
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar2 />
        <div className="h-full flex justify-center">
          <div className="flex items-center justify-center">
            <h1
              className="text-white font-bold sm:text-[80px] text-[35px]"
              ref={title}
            >
              About Our Church
            </h1>
          </div>
        </div>
      </section>
      {/* <Leaders /> */}
      <Services />
      <Newsletter />
      <Footer />
    </>
  );
};

export default About;
