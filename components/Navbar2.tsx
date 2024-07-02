import Image from "next/image";
import Link from "next/link";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { isAdmin } from "@/lib/queries";
import GridLayout from "./GridLayout";

const Navbar2 = () => {
  const session = useSession();
  const [admin, setAdmin] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    const checkUserAdmin = async () => {
      const res = await isAdmin();
      setAdmin(res);
    };
    checkUserAdmin();
    // console.log("Session: ", session);
  }, []);

  // React.useEffect(() => {
  //   console.log("ADMIN: ", admin);
  // }, [admin]);

  return (
    <div className="bg-white h-[100px] shadow-md w-full">
      {/* <GridLayout cls={12} sides={20} fill={true} type="cols" /> */}
      <div className="h-full flex justify-end">
        <div className="hidden md:flex flex-row gap-9 justify-end items-center w-full 2xl:flex-wrap relative">
          <div className="w-full h-full flex items-center justify-center absolute">
            <Link href="/" className="cursor-pointer absolute top-3 left-3">
              <Image
                src="/images/church-logo.svg"
                alt="logo"
                width={70}
                height={70}
              />
            </Link>
          </div>
          <Link
            href="/"
            className="hover:text-gray-700 duration-200 cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-700 duration-200 cursor-pointer"
          >
            About
          </Link>
          <Link
            href="/events"
            className="hover:text-gray-700 duration-200 cursor-pointer"
          >
            Events
          </Link>
          <Link
            href="/gallery"
            className="hover:text-gray-700 duration-200 cursor-pointer"
          >
            Gallery
          </Link>
          <Link
            href="/sermons"
            className="hover:text-gray-700 duration-200 cursor-pointer"
          >
            Sermons
          </Link>
          {/* {admin && <Link href="/media">Media</Link>} */}
          {/* <Link href="/" className="hover:text-gray-700 duration-200">Blog</Link> */}
          {/* <Link href="/" className="hover:text-gray-700 duration-200">Support</Link> */}
          <div className="flex items-center justify-center">
            {session.status === "authenticated" ? (
              <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 ">
                <Link href="/api/auth/signout">Sign Out</Link>
              </div>
            ) : (
              <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 ">
                <Link href="/api/auth/signin">Sign In</Link>
              </div>
            )}
            <div className="flex items-center justify-center p-3"></div>
          </div>
        </div>
        <Sheet>
          <div className="md:hidden h-full w-full flex items-center justify-center relative">
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
                    <Link
                      href="/"
                      className="active:bg-blue-300 bg-none w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="active:bg-blue-300 bg-none w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                    >
                      About
                    </Link>
                    <Link
                      href="/events"
                      className="active:bg-blue-300 bg-none w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                    >
                      Events
                    </Link>
                    <Link
                      href="/gallery"
                      className="active:bg-blue-300 bg-none w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                    >
                      Gallery
                    </Link>
                    <Link
                      href="/sermons"
                      className="active:bg-blue-300 bg-none w-full h-[60px] flex justify-start items-center pl-4 rounded-sm transition ease-in text-xl"
                    >
                      Sermons
                    </Link>
                    {/* <Link href="/" className="hover:text-gray-700 duration-200">Blog</Link> */}
                    {/* <Link href="/" className="hover:text-gray-700 duration-200">Support</Link> */}
                  </div>
                </div>
              </SheetDescription>
            </SheetContent>
          </div>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar2;
