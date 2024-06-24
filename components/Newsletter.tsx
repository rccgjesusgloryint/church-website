"use client";

import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import SubscribeToNewsLetterForm from "./newsletter/subscribe-to-newsletter-form";

const Newsletter = () => {
  const SubHeading = React.useRef<HTMLElement | any>();
  const Heading = React.useRef<HTMLElement | any>();
  const btn = React.useRef<HTMLElement | any>();
  const chuchIcon = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(SubHeading.current, {
      scrollTrigger: Heading.current,
      x: -100,
      duration: 1.5,
      opacity: 0,
      ease: "power2.out",
    });
    gsap.from(Heading.current, {
      scrollTrigger: Heading.current,
      x: 100,
      duration: 1.5,
      opacity: 0,
      ease: "power2.out",
    });
    gsap.from(btn.current, {
      scrollTrigger: btn.current,
      y: 100,
      duration: 1.5,
      opacity: 0,
      ease: "power2.out",
    });
    gsap.from(chuchIcon.current, {
      scrollTrigger: chuchIcon.current,
      y: -100,
      duration: 1.5,
      opacity: 0,
      ease: "power2.out",
    });
  });
  return (
    <section className="h-auto w-screen">
      <div className="h-[558px] w-full bg-footer-bg bg-center bg-cover flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/church-iconpng.png"
            alt="church-icon"
            className="mb-8"
            ref={chuchIcon}
            width={50}
            height={50}
          />
          <h1
            className="flex flex-wrap font-bold sm:text-[45px] text-3xl sm:w-[675px] text-center sm:leading-[50px]"
            ref={Heading}
          >
            Subscribe To Our Newsletter and Keep Up With Our Latest News
          </h1>
          <p
            className="font-normal text-lg w-4/5 text-white mt-3 text-center"
            ref={SubHeading}
          >
            We are committed to Jesus Christ, the Bible, and the Great
            Commission.
          </p>
          <SubscribeToNewsLetterForm />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
