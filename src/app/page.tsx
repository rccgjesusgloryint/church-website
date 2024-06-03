"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Button from "../../components/Button";
import AboutUsPreview from "../../components/AboutUsPreview";
import OurMinistries from "../../components/OurMinistries";

export default function Home() {
  const text = useRef<HTMLElement | any>();
  const navbar = useRef<HTMLElement | any>();
  const btn = useRef<HTMLElement | any>();
  const AboutTxtL = useRef<HTMLElement | any>();
  const AboutTxtR = useRef<HTMLElement | any>();
  const ourMinistriesSubHeading = useRef<HTMLElement | any>();
  const ourMinistriesHeading = useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(text.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
    gsap.from(navbar.current, {
      y: -30,
      duration: 1,
      opacity: 1,
    });
    gsap.from(btn.current, {
      y: 150,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
    gsap.from(AboutTxtL.current, {
      scrollTrigger: AboutTxtL.current,
      x: -80,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
    gsap.from(AboutTxtR.current, {
      scrollTrigger: AboutTxtL.current,
      x: 80,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
    gsap.from(ourMinistriesSubHeading.current, {
      scrollTrigger: ourMinistriesSubHeading.current,
      x: -80,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
    gsap.from(ourMinistriesHeading.current, {
      scrollTrigger: ourMinistriesHeading.current,
      x: 80,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
  });

  return (
    <main>
      <section className="h-screen bg-home-bg bg-center bg-cover text-white">
        <div className="" ref={navbar}>
          <Navbar />
        </div>
        <div className="" ref={text}>
          <Hero />
        </div>
        <div
          className="btn flex flex-col justify-center items-center cursor-pointer"
          ref={btn}
        >
          <Button />
        </div>
      </section>
      <section className="flex flex-col sm:flex-row justify-center items-center bg-white h-[70vh] sm:h-[50vh]">
        <AboutUsPreview AboutTxtL={AboutTxtL} AboutTxtR={AboutTxtR} />
      </section>
      <section className="h-[230vh] sm:h-[125vh] 2xl:h-screen bg-our-ministries bg-center bg-cover">
        <OurMinistries
          ourMinistriesSubHeading={ourMinistriesSubHeading}
          ourMinistriesHeading={ourMinistriesHeading}
        />
      </section>
    </main>
  );
}
