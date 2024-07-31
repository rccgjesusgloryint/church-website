"use client";

import Image from "next/image";
import menu_icon from "../../public/menu-icon.svg";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { isAdmin } from "@/lib/queries";
import React from "react";

export const navContent = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    link: "/about",
  },
  // {
  //   label: "Blog",
  //   link: "/blog",
  // },
  {
    label: "Events",
    link: "/events",
  },
  // {
  //   label: "Support",
  //   link: "/support",
  // },
  {
    label: "Gallery",
    link: "/gallery",
  },
  {
    label: "Sermons",
    link: "/sermons",
  },
  {
    label: "Admin",
    link: "/admin",
  },
];

export const AuthButton = () => {
  const { data: session, status } = useSession();
  return (
    <div className=" w-[100px] h-[60px] absolute top-7 right-5">
      {status === "authenticated" ? (
        <Link
          href="/api/auth/signout"
          className="w-full h-full flex justify-center items-center bg-gray-700 border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 "
        >
          Sign Out
        </Link>
      ) : status === "unauthenticated" ? (
        <Link
          href="/api/auth/signin"
          className="w-full h-full flex justify-center items-center bg-gray-700 border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 "
        >
          Sign In
        </Link>
      ) : null}
    </div>
  );
};
export const AuthButton2 = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center justify-center">
      {status === "authenticated" ? (
        <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 text-white">
          <Link href="/api/auth/signout">Sign Out</Link>
        </div>
      ) : status === "unauthenticated" ? (
        <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 text-white">
          <Link href="/api/auth/signin">Sign In</Link>
        </div>
      ) : null}
      {/* <div className="flex items-center justify-center p-3"></div> */}
    </div>
  );
};

export const MobileViewNavbar = () => {
  const [admin, setAdmin] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkUserAdmin = async () => {
      const res = await isAdmin();
      setAdmin(res);
    };
    checkUserAdmin();
  }, []);
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden w-[100px] h-[100px]">
        <Image
          src={menu_icon}
          alt="menu"
          className="w-[50px] h-[50px] absolute top-7 left-5"
        />
      </SheetTrigger>
      <SheetContent>
        <SheetDescription>
          <div className="flex flex-col justify-start items-start pt-5 pl-5 gap-10 text-black active:text-light-gr">
            {navContent.map(({ label, link }) => (
              <Link
                href={link}
                key={label}
                className={`${
                  (admin === null && label === "Admin") ||
                  (admin === false && label === "Admin")
                    ? "hidden"
                    : ""
                } active:bg-blue-300 bg-none w-full flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl`}
              >
                {label}
              </Link>
            ))}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export const MobileViewNavbar2 = () => {
  const [admin, setAdmin] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkUserAdmin = async () => {
      const res = await isAdmin();
      setAdmin(res);
    };
    checkUserAdmin();
  }, []);
  return (
    <Sheet>
      <SheetTrigger className="md:hidden absolute top-9 left-6">
        <Image
          src="/images/Menu.png"
          alt="logo"
          width={24}
          height={24}
          className=""
        />
      </SheetTrigger>
      <div className="flex items-center justify-center">
        <Link href="/" className="cursor-pointer">
          <Image
            src="images/church-logo.svg"
            alt="logo"
            width={70}
            height={70}
          />
        </Link>
      </div>
      <SheetContent>
        <SheetDescription>
          <div className="md:col-start-1 md:col-span-2 col-start-6 w-full h-full flex items-center sm:justify-center justify-center">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/images/church-logo.svg"
                alt="logo"
                width={70}
                height={70}
              />
            </Link>
          </div>
          <div className="flex w-full h-full items-center justify-start pl-11">
            <div className="flex flex-col gap-11 flex-wrap mt-20 w-full">
              {navContent.map(({ label, link }) => (
                <Link
                  href={link}
                  key={label}
                  className={`${
                    (admin === null && label === "Admin") ||
                    (admin === false && label === "Admin")
                      ? "hidden"
                      : ""
                  } active:bg-blue-300 bg-none w-full flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
