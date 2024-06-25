"use client";

import React from "react";
import Navbar2 from "../../../../../components/Navbar2";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { Sermon } from "@prisma/client";
import { getAllSermons } from "@/lib/queries";

const Page = () => {
  const useTitle = React.useRef<HTMLElement | any>();
  const useSubTitle1 = React.useRef<HTMLElement | any>();
  const useSubTitle2 = React.useRef<HTMLElement | any>();
  const useTitle2 = React.useRef<HTMLElement | any>();

  const [sermons, setSermons] = React.useState<Sermon[]>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(useTitle.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
    gsap.from(useSubTitle1.current, {
      scrollTrigger: useSubTitle1.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(useSubTitle2.current, {
      scrollTrigger: useSubTitle2.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(useTitle2.current, {
      scrollTrigger: useTitle2.current,
      x: 300,
      duration: 1,
      opacity: 0,
    });
  });

  const getSermons = async () => {
    const res = await getAllSermons();
    setSermons(res);
  };

  React.useEffect(() => {
    getSermons();
  }, []);

  React.useEffect(() => {
    console.log("SERMONS: ", sermons);
  }, [sermons]);

  return (
    <>
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar2 />
        <div className="h-full flex justify-center" ref={useTitle}>
          <div className="flex items-center justify-center">
            <h1 className="text-white font-bold sm:text-[80px] text-[35px]">
              Sermons
            </h1>
          </div>
        </div>
      </section>
      <section className="h-auto w-full relative">
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center w-full mt-11">
            <div className="flex flex-row flex-wrap w-full items-center justify-center gap-11 gap-y-[80px] mt-[80px] mb-11 p-3">
              <div className="sm:w-[290px] w-[390px] 2xl:w-[390px] h-[420px] bg-gradient-to-t from-gray-600 to-gray-200 px-[30px] pt-[74px] pb-[40px] text-left relative sm:shadow-xl shadow-2xl flex flex-col items-center justify-center rounded-2xl">
                <span className="absolute bg-[#5B5966] bg-opacity-50 w-[100px] h-[40px] top-3 left-7 rounded flex items-center justify-center">
                  Date
                </span>
                <Image
                  src="/images/play-btn.png"
                  alt="play-btn"
                  width={100}
                  height={100}
                  className="cursor-pointer"
                />
                <h1 className="absolute bottom-5 text-center text-2xl w-full p-3 font-bold">
                  Lorem ipsum dolor sit amet
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
