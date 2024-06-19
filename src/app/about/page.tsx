"use client";

import React from "react";
import Navbar2 from "../../../components/Navbar2";
import Arrow from "../../../components/icons/Arrow";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Newsletter from "../../../components/Newsletter";
import Image from "next/image";

const About = () => {
  const title = React.useRef<HTMLElement | any>();
  const subTitle1 = React.useRef<HTMLElement | any>();
  const subTitle2 = React.useRef<HTMLElement | any>();
  const title2 = React.useRef<HTMLElement | any>();
  const title3 = React.useRef<HTMLElement | any>();
  const viewLink = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(title.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
    gsap.from(subTitle1.current, {
      scrollTrigger: subTitle1.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(subTitle2.current, {
      scrollTrigger: subTitle2.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(title2.current, {
      scrollTrigger: title2.current,
      x: -300,
      duration: 1.2,
      opacity: 0,
    });
    gsap.from(title3.current, {
      scrollTrigger: title3.current,
      x: -300,
      duration: 1.2,
      opacity: 0,
    });
    gsap.from(viewLink.current, {
      scrollTrigger: viewLink.current,
      x: 300,
      duration: 1.2,
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
      <section className="h-auto w-full relative">
        <div className="flex flex-col items-start sm:px-[60px] px-5">
          <div className="flex flex-col w-full mt-11">
            <div
              className="flex flex-col items-start justify-end"
              ref={subTitle1}
            >
              <h3 className="tracking-widest">CHURCH OFFICERS</h3>
              <div className="bg-black opacity-55 w-[163px] h-[1px] mt-1 mb-0"></div>
            </div>
            <div className="flex flex-row items-center justify-start w-full relative">
              <h1 className="font-bold sm:text-[40px] text-[30px]" ref={title2}>
                Meet Our Wonderful Church Leaders
              </h1>
              {/* <div
                className="flex items-center gap-3 font-bold hover:opacity-55 transition-opacity ease-in-out cursor-pointer absolute right-0 bottom-0"
                ref={viewLink}
              >
                <Link href="">VIEW ALL PASTORS</Link>
                <Arrow />
              </div> */}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center flex-wrap gap-5 mt-[100px] w-full mb-11">
            <div className="sm:w-[273px] w-full h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
              <h1>Full Name</h1>
              <h3>Title</h3>
            </div>
            <div className="sm:w-[273px] w-full h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
              <h1>Full Name</h1>
              <h3>Title</h3>
            </div>
            <div className="sm:w-[273px] w-full h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
              <h1>Full Name</h1>
              <h3>Title</h3>
            </div>
            <div className="sm:w-[273px] w-full h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
              <h1>Full Name</h1>
              <h3>Title</h3>
            </div>
          </div>
        </div>
        <div className="absolute w-full h-[200px] bg-dark-gr z-[-10] bottom-0"></div>
      </section>
      <section className="h-auto w-full relative">
        <div className="absolute w-full h-[380px] bg-dark-gr z-[-10] top-0"></div>
        <div className="flex flex-col items-start px-5 mb-9">
          <div className="flex flex-col w-full mt-11 text-white">
            <div
              className="flex flex-col items-start justify-end"
              ref={subTitle2}
            >
              <h3 className="tracking-widest">POPULAR SERVICES</h3>
              <div className="bg-white opacity-55 w-[163px] h-[1px] mt-1 mb-0"></div>
            </div>
            <div
              className="flex flex-row items-center justify-start w-full relative"
              ref={title3}
            >
              <h1 className="font-bold sm:text-[40px] text-[30px]">
                Keeping Our Church Running Smoothly
              </h1>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center flex-wrap gap-5 mt-[100px] w-full mb-11 ">
            <div className="sm:w-[331px] w-full h-[460px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-1 bg-bible-studies bg-center bg-cover">
              <span>
                <Image
                  src="/images/Zoom.png"
                  alt="location"
                  width={40}
                  height={40}
                />
              </span>
              <div className="backdrop-blur-xl">
                <h3 className="font-bold text-lg">Spiritual Growth</h3>
                <h1 className="font-bold text-3xl">Bible Studies</h1>
              </div>
            </div>
            <div className="sm:w-[331px] w-full h-[460px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-1 bg-prayers bg-center bg-cover">
              <span>
                <Image
                  src="/images/Zoom.png"
                  alt="location"
                  width={40}
                  height={40}
                />
              </span>
              <div className="backdrop-blur-xl">
                <h3 className="font-bold text-lg">Spiritual Growth</h3>
                <h1 className="font-bold text-3xl">Friday Prayers</h1>
              </div>
            </div>
            <div className="sm:w-[331px] w-full h-[460px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-1 bg-sunday-service bg-center bg-cover">
              <span>
                <Image
                  src="/images/Zoom.png"
                  alt="location"
                  width={40}
                  height={40}
                />
              </span>
              <div className="backdrop-blur-xl">
                <h3 className="font-bold text-lg">Spiritual Growth</h3>
                <h1 className="font-bold text-3xl">Sunday Service</h1>
              </div>
            </div>
            <div className="sm:w-[331px] w-full h-[460px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-1 bg-evangelism bg-center bg-cover">
              <span>
                {/* <Image
                  src="/images/Zoom.png"
                  alt="location"
                  width={40}
                  height={40}
                /> */}
              </span>
              <div className="backdrop-blur-2xl">
                <h3 className="font-bold text-lg">Soul Winning</h3>
                <h1 className="font-bold text-3xl">Evangelism</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
};

export default About;
