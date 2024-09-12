import React from "react";

import Image from "next/image";

import { CiLogin } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
  const subTitle2 = React.useRef<HTMLElement | any>();
  const title3 = React.useRef<HTMLElement | any>();

  useGSAP(() => {
    gsap.from(subTitle2.current, {
      scrollTrigger: subTitle2.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(title3.current, {
      scrollTrigger: title3.current,
      x: -300,
      duration: 1.2,
      opacity: 0,
    });
  });

  return (
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
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">
                <Image
                  src="/images/Zoom.png"
                  alt="location"
                  width={40}
                  height={40}
                />
              </HoverCardTrigger>
              <HoverCardContent>
                {status === "authenticated" ? (
                  <div>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_ZOOM_LINK}`}
                      className="flex gap-2 items-center justify-center"
                      target="_blank"
                    >
                      Join Meeting{" "}
                      <span>
                        <GoArrowUpRight />
                      </span>
                    </Link>
                    <p>Zoom Password :sdfsdfdsf</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-xl">Sensitive data! Please log in</p>
                    <Link href="/api/auth/signin">
                      <CiLogin size={35} />
                    </Link>
                  </div>
                )}
              </HoverCardContent>
            </HoverCard>
            <div className="backdrop-blur-xl">
              <h3 className="font-bold text-lg">Spiritual Growth</h3>
              <h1 className="font-bold text-3xl">Bible Studies</h1>
            </div>
          </div>
          <div className="sm:w-[331px] w-full h-[460px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-1 bg-sunday-service bg-center bg-cover">
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">
                <Image
                  src="/images/Zoom.png"
                  alt="location"
                  width={40}
                  height={40}
                />
              </HoverCardTrigger>
              <HoverCardContent>
                {status === "authenticated" ? (
                  <div>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_ZOOM_LINK}`}
                      className="flex gap-2 items-center justify-center"
                      target="_blank"
                    >
                      Join Meeting{" "}
                      <span>
                        <GoArrowUpRight />
                      </span>
                    </Link>
                    <p>Zoom Password :sdfsdfdsf</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-xl">Sensitive data! Please log in</p>
                    <Link href="/api/auth/signin">
                      <CiLogin size={35} />
                    </Link>
                  </div>
                )}
              </HoverCardContent>
            </HoverCard>
            <div className="backdrop-blur-xl">
              <h3 className="font-bold text-lg">Fellowship</h3>
              <h1 className="font-bold text-3xl">Sunday Service</h1>
            </div>
          </div>
          <div className="sm:w-[331px] w-full h-[460px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-1 bg-prayers bg-center bg-cover">
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">
                <Image
                  src="/images/Zoom.png"
                  alt="location"
                  width={40}
                  height={40}
                />
              </HoverCardTrigger>
              <HoverCardContent>
                {status === "authenticated" ? (
                  <div>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_ZOOM_LINK}`}
                      className="flex gap-2 items-center justify-center"
                      target="_blank"
                    >
                      Join Meeting{" "}
                      <span>
                        <GoArrowUpRight />
                      </span>
                    </Link>
                    <p>Zoom Password :sdfsdfdsf</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-xl">Sensitive data! Please log in</p>
                    <Link href="/api/auth/signin">
                      <CiLogin size={35} />
                    </Link>
                  </div>
                )}
              </HoverCardContent>
            </HoverCard>
            <div className="backdrop-blur-xl">
              <h3 className="font-bold text-lg">Spiritual Growth</h3>
              <h1 className="font-bold text-3xl">Friday Prayers</h1>
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
  );
};

export default Services;
