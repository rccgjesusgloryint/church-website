"use client";

import React from "react";
import Image from "next/image";
import menu_icon from "../public/menu-icon.svg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { getAuthUserDetails } from "@/lib/queries";

const Navbar = () => {
  const [user, setUser] = React.useState("");
  // const getAuth = async () => {
  //   const user = await getAuthUserDetails();
  //   if (!user) {
  //     return null;
  //   } else {
  //     setUser(user?.role);
  //   }
  // };
  // React.useEffect(() => {
  //   getAuth();
  // }, [user]);
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
          <SheetDescription>
            <div className="flex flex-col justify-start items-start pt-5 pl-5 gap-10 text-black active:text-light-gr">
              <Link
                href="/home"
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
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
      <div className="relative pt-4" ref={navbar}>
        <div className="hidden sm:flex flex-row font-normal gap-7 justify-center items-center cursor-pointer">
          <Link href="/home" className="hover:text-gray-700 duration-200">
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
          {/* {user === "ADMIN" ? <Link href="/media">Media</Link> : ""} */}
        </div>
        <div className="w-auto h-auto flex flex-row gap-2 absolute top-0 right-5 items-center">
          <SignedOut>
            <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500">
              <Link href="/sign-in">Sign In</Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="border-2 border-gray-700 flex items-center justify-center p-3">
              <UserButton />
            </div>
          </SignedIn>
        </div>
        {/* <Link href="/home" className="hover:text-gray-700 duration-200">Blog</Link> */}
        {/* <Link href="/home" className="hover:text-gray-700 duration-200">Support</Link> */}
      </div>
    </>
  );
};

export default Navbar;
