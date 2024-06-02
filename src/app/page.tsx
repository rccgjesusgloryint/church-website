"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Button from "../../components/Button";
import { ScrollTrigger } from "gsap/all";

export default function Home() {
  const container = useRef<HTMLElement | any>();
  const text = useRef<HTMLElement | any>();
  const navbar = useRef<HTMLElement | any>();
  const btn = useRef<HTMLElement | any>();
  const AboutTxtL = useRef<HTMLElement | any>();
  const AboutTxtR = useRef<HTMLElement | any>();

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
  });

  return (
    <main>
      <section
        className="h-screen bg-home-bg bg-center bg-cover text-white"
        ref={container}
      >
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
        <div
          className="p-0 m-0 flex flex-col sm:w-[567px] min-h-[222px] px-[10px] pb-[10px]"
          ref={AboutTxtL}
        >
          <div className="mb-5 flex flex-col ">
            <h1 className="font-bold text-lg text-light-gr tracking-widest">
              ABOUT US
            </h1>
            <div className="bg-gray-400 h-[2px] w-[100px]"></div>
          </div>
          <div className="">
            <h1 className="text-4xl	font-bold text-left text-dark-gr">
              Jesus Glory is a church that believes in Jesus, a church that
              loves God and people.
            </h1>
          </div>
        </div>
        <div
          className="flex flex-col dark-gr sm:w-[567px] h-[220px] px-2.5 pt-2.5"
          ref={AboutTxtR}
        >
          <div>
            <h3 className="font-bold text-xl text-dark-gr mb-5">
              Lifes is a contemporary Christian church. Overwhelmed by the gift
              of salvation we have found in Jesus.
            </h3>
            <h4 className="w-full font-sans font-normal text-sm text-light-gr">
              We have a heart for authentic worship, are passionate about the
              local church, and are on mission to see Gods kingdom established
              across the earth. Lifes Church was founded by Dylan and Stacy
              Johnes in 1994 in the western suburbs of New York, USA. Now, Lifes
              has churches in city centres in 23 cities around the country.
            </h4>
          </div>
        </div>
      </section>
    </main>
  );
}
