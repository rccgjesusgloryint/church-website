"use client";

import React from "react";
import Image from "next/image";
import menu_icon from "../public/menu-icon.svg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { auth } from "@/auth";
import { any } from "zod";
import { useSession } from "next-auth/react";
import { isAdmin } from "@/lib/queries";
// import { getAuthUserDetails } from "@/lib/queries";

const Navbar = () => {
  const [admin, setAdmin] = React.useState<boolean | null>(null);
  const navbar = React.useRef<HTMLElement | any>();

  const session = useSession();

  React.useEffect(() => {
    const checkUserAdmin = async () => {
      const res = await isAdmin();
      setAdmin(res);
    };
    checkUserAdmin();
    console.log("Session: ", session);
  }, []);

  React.useEffect(() => {
    console.log("ADMIN: ", admin);
  }, [admin]);

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
        <Sheet>
          <SheetTrigger className="sm:hidden w-[100px] h-[100px]">
            <Image
              src={menu_icon}
              alt="menu"
              className="w-[50px] h-[50px] absolute top-5 left-5"
            />
          </SheetTrigger>
          <SheetContent>
            <SheetDescription>
              <div className="flex flex-col justify-start items-start pt-5 pl-5 gap-10 text-black active:text-light-gr">
                <Link
                  href="/"
                  className="active:bg-blue-300 bg-none w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                >
                  About
                </Link>
                {/* <Link
                  href=""
                  className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                >
                  Blog
                </Link> */}
                <Link
                  href="/events"
                  className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                >
                  Events
                </Link>
                {/* <Link
                  href=""
                  className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                >
                  Support
                </Link> */}
                <Link
                  href="/gallery"
                  className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                >
                  Gallery
                </Link>
                <Link
                  href="/sermon"
                  className="active:bg-blue-300 w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                >
                  Sermons
                </Link>
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
        <div className="hidden sm:flex flex-row font-normal gap-7 justify-center items-center cursor-pointer h-full pt-11">
          <Link href="/" className="hover:text-gray-700 duration-200">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-700 duration-200">
            About
          </Link>
          <Link href="/events" className="hover:text-gray-700 duration-200">
            Events
          </Link>
          <Link href="/gallery" className="hover:text-gray-700 duration-200">
            Gallery
          </Link>
          <Link href="/sermons" className="hover:text-gray-700 duration-200">
            Sermons
          </Link>
          {admin && <Link href="/media">Media</Link>}
          <div className="absolute top-7 right-5 flex">
            {session.status === "authenticated" ? (
              <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 ">
                <Link href="/api/auth/signout">Sign Out</Link>
              </div>
            ) : (
              <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 ">
                <Link href="/api/auth/signin">Sign In</Link>
              </div>
            )}
            <div className="border-2 border-gray-700 flex items-center justify-center p-3"></div>
          </div>
        </div>
        <div className="absolute top-7 right-5 sm:hidden">
          <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 ">
            <Link href="/api/auth/signin">Sign In</Link>
          </div>
          <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 ">
            <Link href="/api/auth/signout">Sign Out</Link>
          </div>

          <div className="border-2 border-gray-700 flex items-center justify-center p-3"></div>
        </div>
        <div className="sm:relative sm:pt-4 h-[100px]" ref={navbar}>
          {/* <Link href="/" className="hover:text-gray-700 duration-200">Blog</Link> */}
          {/* <Link href="/" className="hover:text-gray-700 duration-200">Support</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
