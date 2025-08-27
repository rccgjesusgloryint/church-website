"use client";

import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

type Props = {};

const Title = (props: Props) => {
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
    <div className="flex items-center justify-center">
      <h1
        className="text-white font-bold sm:text-[80px] text-[35px]"
        ref={title}
      >
        About Our Church
      </h1>
    </div>
  );
};

export default Title;
