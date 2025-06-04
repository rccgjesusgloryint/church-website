"use client";

import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Link from "next/link";

import { AuthButton, MobileViewNavbar, navContent } from ".";
import { accessCheck, isAdmin } from "@/lib/queries";
import { Role } from "@prisma/client";
import Loader from "../Loader";

const Navbar = () => {
  const navbar = React.useRef<HTMLElement | any>();
  const [admin, setAdmin] = React.useState<boolean | null>(null);
  const [userRole, setUserRole] = React.useState<Role | undefined>();
  const [loaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(false);
    const navbarCheck = async () => {
      const res = await isAdmin();
      setAdmin(res);
      const userRole = await accessCheck();
      setUserRole(userRole);
      setIsLoaded(true);
    };
    navbarCheck();
  }, []);

  React.useEffect(() => {
    console.log(loaded);
  }, [loaded]);

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
        // setTimeout(()
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
                    admin === null ||
                    (userRole === undefined && label === "Blogs")
                      ? "hidden"
                      : ""
                  } hover:text-gray-700 duration-200`}
                >
                  {label}
                </Link>
              ))}
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
