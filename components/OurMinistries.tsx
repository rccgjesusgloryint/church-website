import Image from "next/image";
import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const OurMinistries = () => {
  const ourMinistriesSubHeading = React.useRef<HTMLElement | any>();
  const ourMinistriesHeading = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
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
    <section className="h-[230vh] sm:h-[125vh] 2xl:h-screen bg-our-ministries bg-center bg-cover overflow-clip w-screen">
      <div className="flex flex-col justify-center items-center sm:pt-[127px] pt-9 sm:mb-20 mb-8">
        <div className="mb-8" ref={ourMinistriesSubHeading}>
          <h3 className="text-light-gr">OUR MINISTRIES</h3>
          <div className="bg-light-gr opacity-50 h-[2px] w-[7.5rem]"></div>
        </div>

        <h1
          className="font-bold sm:text-4xl text-3xl sm:w-[32rem] text-center"
          ref={ourMinistriesHeading}
        >
          Keeping Our Church Running Smoothly
        </h1>
      </div>
      <div className="flex sm:flex-row flex-col justify-center items-center">
        <div className="w-96 h-[523px] px-4 sm:pb-0 pb-8 ">
          <div className="bg-white h-full shadow-md">
            <Image
              src="/images/our-ministries-pic2.jpg"
              alt="our-ministries-pic1"
              width={391}
              height={261}
            />
            <div className="p-4 text-center sm:mt-14 mt-2 flex flex-col justify-center items-center">
              <h2 className="font-bold sm:text-2xl sm:w-full text-xl mb-4 w-3/4">
                Microloans for Rural Women in East Africa
              </h2>
              <p className="font-normal w-4/5 sm:w-full">
                Mission is to establish village-level loan hubs to provide
                capital and support to rural women in the lowest income brackets
                in East Africa
              </p>
            </div>
          </div>
        </div>
        <div className="w-96 h-[523px] px-4 sm:pb-0 pb-8 ">
          <div className="bg-white h-full shadow-md">
            <Image
              src="/images/our-ministries-pic3.jpg"
              alt="our-ministries-pic1"
              width={391}
              height={261}
            />
            <div className="p-4 text-center sm:mt-14 mt-2 flex flex-col justify-center items-center">
              <h2 className="font-bold sm:text-2xl sm:w-3/4 text-xl mb-4 w-full">
                Save the ruins of a Slovak monastery
              </h2>
              <p className="font-normal w-4/5 sm:w-full">
                Mission is to establish village-level loan hubs to provide
                capital and support to rural women in the lowest income brackets
                in East Africa
              </p>
            </div>
          </div>
        </div>
        <div className="w-96 h-[523px] px-4 sm:pb-0 pb-8 ">
          <div className="bg-white h-full shadow-md">
            <Image
              src="/images/our-ministries-pic1.jpg"
              alt="our-ministries-pic1"
              width={391}
              height={261}
            />
            <div className="p-4 text-center sm:mt-14 mt-2 flex flex-col justify-center items-center">
              <h2 className="font-bold sm:text-2xl sm:w-full text-xl mb-4 w-3/4">
                University expenses for former street children{" "}
              </h2>
              <p className="font-normal w-4/5 sm:w-full">
                Mission is to establish village-level loan hubs to provide
                capital and support to rural women in the lowest income brackets
                in East Africa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMinistries;
