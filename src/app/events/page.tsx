"use client";

import React from "react";

import Navbar2 from "../../../components/Navbar2";
import Footer from "../../../components/Footer";

import { LuClock3 } from "react-icons/lu";
import { FaRegMap } from "react-icons/fa6";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const page = () => {
  const eventCards = [
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
  ];

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
      x: 300,
      duration: 1,
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
        <div className="h-full flex justify-center" ref={title}>
          <div className="flex items-center justify-center">
            <h1 className="text-white font-bold sm:text-[80px] text-[35px]">
              Our Events
            </h1>
          </div>
        </div>
      </section>
      <section className="h-auto w-full relative">
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center w-full mt-11">
            <div
              className="flex flex-col items-start justify-end"
              ref={subTitle1}
            >
              <h3 className="tracking-widest">UPCOMING EVENTS</h3>
              <div className="bg-black opacity-55 w-[163px] h-[1px] mt-1 mb-0"></div>
            </div>
            <div
              className="flex flex-row items-center justify-center w-full relative mt-11"
              ref={title2}
            >
              <h1 className="font-bold sm:text-[40px] text-[30px] w-1/2 text-center">
                Don't Miss Your Chance to Get Closer to God
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap w-full items-center justify-center gap-11 gap-y-[80px] mt-[80px] mb-11">
          {eventCards.map((event, index) => {
            return (
              <div
                className="sm:w-[290px] 2xl:w-[390px] h-[420px] bg-white px-[30px] pt-[74px] pb-[40px] text-left relative shadow-xl"
                key={index}
              >
                <div className="absolute bg-light-gr flex flex-wrap justify-center items-center content-center top-[-45px] rounded-[50%] w-[90px] h-[90px] pt-[8px] text-white drop-shadow-custom">
                  <p className="text-[28px] text-center w-full mb-[3px] leading-6">
                    11
                  </p>
                  <p className="text-base mb-[10px]">
                    {event.date[0].length > 3
                      ? event.date[0].slice(0, 3)
                      : event.date[0]}
                  </p>
                </div>

                <h2 className="font-bold text-2xl w-[230px] 2xl:w-[337px] mb-[20px]">
                  {event.heading}
                </h2>
                <div className="relative">
                  <div className="flex flex-col absolute w-[112px]">
                    <span className="mt-1">
                      <LuClock3 />
                    </span>
                    <span className=""></span>
                  </div>
                  <div className="font-bold text-base pl-10">
                    <div>
                      <p>{event.date[0]}</p>
                    </div>
                    <div>
                      <p>{event.date[1]}</p>
                    </div>
                  </div>
                  <div className="pt-[20px]">
                    <span className="absolute mt-[5px]">
                      <FaRegMap />
                    </span>
                    <p className="font-bold text-base pl-10">
                      {event.location}
                    </p>
                  </div>
                </div>
                <div className="border-2 border-light-gr mt-[56px] w-[160px] h-[60px] flex justify-center items-center hover:bg-light-gr hover:text-white cursor-pointer transition ease-in-out">
                  <h3 className="font-bold text-sm tracking-wider">
                    READ MORE
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
