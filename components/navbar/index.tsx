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

export const navContent = [
  { label: "Home", link: "/" },
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

export const MobileViewNavbar = () => {
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
                className="active:bg-blue-300 bg-none w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                key={label}
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
