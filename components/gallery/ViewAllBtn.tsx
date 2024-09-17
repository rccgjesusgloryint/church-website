import Image from "next/image";
import Link from "next/link";
import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const ViewAllBtn = () => {
  const viewAllBtn = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

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
    <Link href="/gallery">
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
  );
};

export default ViewAllBtn;
