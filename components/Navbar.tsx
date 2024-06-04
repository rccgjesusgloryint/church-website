import React from "react";
import Image from "next/image";
import menu_icon from "../public/menu-icon.svg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    <>
      <Sheet>
        <SheetTrigger>
          <Image src={menu_icon} alt="menu" className="pt-5 pl-5 sm:hidden" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <ul className="flex flex-col justify-start items-start pt-5 pl-5 gap-10 text-black active:text-light-gr">
                <li className="active:bg-blue-300 bg-none w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in">
                  Home
                </li>
                <li className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in">
                  About
                </li>
                <li className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in">
                  Blog
                </li>
                <li className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in">
                  Events
                </li>
                <li className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in">
                  Support
                </li>
                <li className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in">
                  Gallery
                </li>
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <ul
        className="hidden sm:flex flex-row font-normal gap-7 justify-end m-0 pr-11 cursor-pointer"
        ref={navbar}
      >
        <li className="hover:text-gray-700 duration-200">Home</li>
        <li className="hover:text-gray-700 duration-200">About</li>
        <li className="hover:text-gray-700 duration-200">Blog</li>
        <li className="hover:text-gray-700 duration-200">Events</li>
        <li className="hover:text-gray-700 duration-200">Support</li>
        <li className="hover:text-gray-700 duration-200">Gallery</li>
      </ul>
    </>
  );
};

export default Navbar;
