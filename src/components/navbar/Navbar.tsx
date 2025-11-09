"use client";

import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Link from "next/link";

import MobileViewNavbar from "./mobile/MobileViewNavbar";
import { navContent } from "@/lib/constants";
import AuthButton from "./AuthButton";
import { useNavbarAuth } from "@/hooks/useNavbarAuth";
import { ModeToggle } from "../toggle-mode";
import { Skeleton } from "../ui/skeleton";

const Navbar = () => {
  const navbar = React.useRef<HTMLElement | any>();
  const { admin, loaded } = useNavbarAuth();

  useGSAP(() => {
    gsap.from(navbar.current, {
      y: -30,
      duration: 1,
      opacity: 1,
    });
  });

  return (
    <>
      {loaded ? (
        <div className="w-screen">
          <div className="relative">
            <MobileViewNavbar admin={admin} />
            <div className="hidden sm:flex flex-row font-normal gap-7 justify-center items-center cursor-pointer h-full pt-11 mb-[10rem]">
              {navContent.map(({ label, link }) => (
                <Link
                  href={link}
                  key={label}
                  className={`${
                    admin === null ||
                    (admin === false && label === "Admin") ||
                    admin === null
                      ? "hidden"
                      : ""
                  } hover:text-primary duration-200`}
                >
                  {label}
                </Link>
              ))}
              <ModeToggle />
              <AuthButton />
            </div>
            <AuthButton />
          </div>
        </div>
      ) : (
        <div className="w-screen flex items-center justify-center relative">
          <Skeleton className="h-[15px] w-[30px] px-10 my-10 opacity-5" />
        </div>
      )}
    </>
  );
};

export default Navbar;
