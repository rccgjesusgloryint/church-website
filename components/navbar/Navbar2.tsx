"use client";

import Image from "next/image";
import Link from "next/link";

import React from "react";

import { AuthButton2, MobileViewNavbar2, navContent } from ".";
import { accessCheck, isAdmin } from "@/lib/queries";
import { Role } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/toggle-mode";

const Navbar2 = () => {
  const [admin, setAdmin] = React.useState<boolean | null>(null);
  const [loaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(false);
    const navbarCheck = async () => {
      const res = await isAdmin();
      setAdmin(res);
      setIsLoaded(true);
    };
    navbarCheck();
  }, []);

  return (
    <div className="bg-transparent h-[100px] shadow-md w-full flex items-center justify-center relative">
      <Link
        href="/"
        className="hidden md:flex cursor-pointer absolute top-3 left-5"
      >
        <Image
          src="/images/church-logo.svg"
          alt="logo"
          width={70}
          height={70}
        />
      </Link>
      <div className="hidden md:flex absolute top-5 right-5 sm:flex gap-3">
        <span className="pt-2">
          <ModeToggle />
        </span>
        <AuthButton2 />
      </div>
      {loaded ? (
        <div className="h-full sm:flex sm:justify-end">
          <div className="sm:hidden h-full w-full flex items-center justify-center">
            <MobileViewNavbar2 />
          </div>
          <div className="hidden md:flex flex-row gap-9 justify-center items-center w-full 2xl:flex-wrap relative mr-10">
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
          </div>
        </div>
      ) : (
        <div className="w-screen flex items-center justify-center relative">
          <Skeleton className="h-[15px] w-[30px] px-10 my-10 opacity-5" />
        </div>
      )}
    </div>
  );
};

export default Navbar2;
