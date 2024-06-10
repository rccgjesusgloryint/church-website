import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";

const Button = () => {
  const btn = React.useRef<HTMLElement | any>();

  useGSAP(() => {
    gsap.from(btn.current, {
      y: 150,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
  });
  return (
    <div
      className="btn flex flex-col justify-center items-center cursor-pointer"
      ref={btn}
    >
      <div className="flex justify-center items-center bg-gray-700 w-[210px] h-[60px] border-gray-700 hover:bg-transparent hover:border-2 hover:text-gray-700 duration-500">
        <Link href={"/about"}>LEARN MORE NOW</Link>
      </div>
    </div>
  );
};

export default Button;
