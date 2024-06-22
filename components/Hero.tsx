import React from "react";

import Navbar from "./Navbar";
import Button from "./Button";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const text = React.useRef<HTMLElement | any>();

  useGSAP(() => {
    gsap.from(text.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
  });

  return (
    <section className="h-screen w-screen bg-home-bg bg-center bg-cover text-white overflow-clip relative">
      <Navbar />
      <div ref={text}>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl sm:text-6xl font-bold flex text-center sm:w-1/2">
            Revive the church and evangelise the world.
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-center mt-5 sm:mt-10 mb-10 leading-5 w-[330px] sm:w-[496px]">
            We believe every born again child of God is a mobile altar, divinely
            enabled to offer sacrifices to God from a pure heart. A mobile altar
            does not visit Gods presence, he carries it.
          </p>
        </div>
      </div>
      <Button />
    </section>
  );
};

export default Hero;
