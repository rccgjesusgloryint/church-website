"use client";

import React from "react";

import { Skeleton } from "../../src/components/ui/skeleton";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Link from "next/link";

import { accessCheck, getAuthUserDetails, isAdmin } from "@/lib/queries";
import { Role } from "@prisma/client";
import Loader from "../Loader";
import { ModeToggle } from "../../src/components/toggle-mode";
import { useNavbarAuth } from "../../src/hooks/useNavbarAuth";
import MobileViewNavbar from "./MobileViewNavbar";
import { navContent } from "@/lib/constants";
import AuthButton from "./AuthButton";

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
            <MobileViewNavbar />
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
                  } hover:text-gray-700 duration-200`}
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
