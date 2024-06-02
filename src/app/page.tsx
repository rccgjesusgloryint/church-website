"use client";

import { useRef } from "react";

import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Button from "../../components/Button";
import AboutUsPreview from "../../components/AboutUsPreview";

export default function Home() {
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
      <section className="h-[125vh] 2xl:h-screen  bg-our-ministries bg-center bg-cover">
        <div className="flex flex-col justify-center items-center pt-[127px] mb-20">
          <div className="mb-8">
            <h3 className="text-light-gr">OUR MINISTRIES</h3>
            <div className="bg-light-gr opacity-50 h-[2px] w-[7.5rem]"></div>
          </div>
          <h1 className="font-bold text-4xl w-[32rem] text-center">
            Keeping Our Church Running Smoothly
          </h1>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="w-96 h-[523px] px-4">
            <div className="bg-white h-full shadow-md">
              <Image
                src="/images/our-ministries-pic1.jpg"
                alt="our-ministries-pic1"
                width={391}
                height={261}
              />
              <div className="p-4 text-center mt-14">
                <h2 className="font-bold text-2xl mb-4">
                  Microloans for Rural Women in East Africa
                </h2>
                <p className="font-normal">
                  Mission is to establish village-level loan hubs to provide
                  capital and support to rural women in the lowest income
                  brackets in East Africa
                </p>
              </div>
            </div>
          </div>
          <div className="w-96 lg:h-[523px] px-4">
            <div className="bg-white h-full shadow-md">
              <Image
                src="/images/our-ministries-pic1.jpg"
                alt="our-ministries-pic1"
                width={391}
                height={261}
              />
              <div className="p-4 text-center mt-14">
                <h2 className="font-bold text-2xl mb-4">
                  Microloans for Rural Women in East Africa
                </h2>
                <p className="font-normal">
                  Mission is to establish village-level loan hubs to provide
                  capital and support to rural women in the lowest income
                  brackets in East Africa
                </p>
              </div>
            </div>
          </div>
          <div className="w-96 lg:h-[523px] px-4">
            <div className="bg-white h-full shadow-md">
              <Image
                src="/images/our-ministries-pic1.jpg"
                alt="our-ministries-pic1"
                width={391}
                height={261}
              />
              <div className="p-4 text-center mt-14">
                <h2 className="font-bold text-2xl mb-4">
                  Microloans for Rural Women in East Africa
                </h2>
                <p className="font-normal">
                  Mission is to establish village-level loan hubs to provide
                  capital and support to rural women in the lowest income
                  brackets in East Africa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
