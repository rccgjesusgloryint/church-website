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
import { accessCheck, isAdmin } from "@/lib/queries";
import React from "react";
import { Role } from "@prisma/client";
import { ModeToggle } from "@/components/toggle-mode";

export const navContent = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Blogs",
    link: "/blogs",
  },
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
  {
    label: "Contact",
    link: "/contact",
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
      <SheetContent className="w-1/2">
        <SheetDescription>
          <div className="flex flex-col justify-start items-start pt-5 pl-5 gap-10 text-black active:text-light-gr">
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
  const [userRole, setUserRole] = React.useState<Role | undefined>();

  React.useEffect(() => {
    const checkUserAdmin = async () => {
      const res = await isAdmin();
      setAdmin(res);
    };
    const checkUserRole = async () => {
      const userRole = await accessCheck();
      setUserRole(userRole);
    };
    checkUserRole();
    checkUserAdmin();
  }, []);
  return (
    <Sheet>
      <SheetTrigger className="md:hidden absolute top-9 left-5">
        <Image
          src="/images/Menu.png"
          alt="menu-logo"
          width={24}
          height={24}
          className=""
        />
      </SheetTrigger>
      <div className="absolute right-5 top-8">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/images/church-logo.svg"
            alt="church-logo"
            width={70}
            height={70}
          />
        </Link>
      </div>
      <SheetContent className="w-3/5">
        <SheetDescription>
          <div className="w-full h-full flex items-center sm:justify-center justify-center">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/images/church-logo.svg"
                alt="church-logo"
                width={70}
                height={70}
              />
            </Link>
          </div>
          <div className="flex w-full h-full items-center justify-start pl-11">
            <div className="flex flex-col gap-8 flex-wrap mt-10 w-full">
              {navContent.map(({ label, link }) => (
                <Link
                  href={link}
                  key={label}
                  className={`${
                    admin === null ||
                    (admin === false && label === "Admin") ||
                    admin === null
                      ? // (userRole === undefined && label === "Blogs")
                        "hidden"
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
