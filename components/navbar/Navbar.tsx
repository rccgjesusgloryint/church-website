"use client";

import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Link from "next/link";

import { AuthButton, MobileViewNavbar, navContent } from ".";

const Navbar = () => {
  const navbar = React.useRef<HTMLElement | any>();

  useGSAP(() => {
    gsap.from(navbar.current, {
      y: -30,
      duration: 1,
      opacity: 1,
    });
  });

  return (
    <div className="w-screen">
      <div className="relative">
        <MobileViewNavbar />
        <div className="hidden sm:flex flex-row font-normal gap-7 justify-center items-center cursor-pointer h-full pt-11 mb-[10rem]">
          {navContent.map(({ label, link }) => (
            <Link
              href={link}
              className="hover:text-gray-700 duration-200"
              key={label}
            >
              {label}
            </Link>
          ))}
          <AuthButton />
        </div>
        <AuthButton />
      </div>
    </div>
  );
};

export default Navbar;
