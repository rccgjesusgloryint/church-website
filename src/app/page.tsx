"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Button from "../../components/Button";

export default function Home() {
  if (typeof window === "undefined") {
    return null;
  } else if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
  }

  const container = useRef<HTMLElement | any>();
  const text = useRef<HTMLElement | any>();
  const navbar = useRef<HTMLElement | any>();
  const btn = useRef<HTMLElement | any>();

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
  });

  return (
    <main>
      <section
        className="h-screen bg-home-bg bg-center bg-cover"
        ref={container}
      >
        <div className="navbar" ref={navbar}>
          <Navbar />
        </div>
        <div className="text" ref={text}>
          <Hero />
        </div>
        <div
          className="btn flex flex-col justify-center items-center cursor-pointer"
          ref={btn}
        >
          <Button />
        </div>
      </section>
      <section className="flex flex-row bg-white h-[50vh] bg-center bg-cover">
        <div className="flex flex-col border-slate-900 border-4 w-1/2">
          <div className="">
            <h1 className="font-bold text-gray-950">ABOUT US</h1>
          </div>
          <div className="">
            <h1 className="text-4xl	font-bold text-center bg-slate-500">
              Jesus Glory is a church that believes
              <br /> in Jesus, a church that loves
              <br /> God and people.
            </h1>
          </div>
        </div>
        <div className="flex flex-col bg-red-600 border-slate-400 border-4 w-1/2">
          <div>
            <h3>
              Lifes is a contemporary Christian church. Overwhelmed by the gift
              of salvation we have found in Jesus.
            </h3>
            <h4>
              We have a heart for authentic worship, are passionate about the
              local church, and are on mission to see God’s kingdom established
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
