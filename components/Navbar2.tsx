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
import { getAuthUserDetails } from "@/lib/queries";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar2 = () => {
  const [user, setUser] = React.useState("");
  const getAuth = async () => {
    const user = await getAuthUserDetails();
    if (!user) {
      return null;
    } else {
      setUser(user.role);
    }
  };
  React.useEffect(() => {
    getAuth();
  }, [user]);
  return (
    <div className="bg-white h-[100px] shadow-md">
      {/* <GridLayout cls={8} sides={20} fill={true} type="cols" /> */}
      <div className="hidden grid-cols-12 md:grid h-full w-full">
        <div className="md:hidden col-start-1 col-span-1 relative">
          <Image
            src="/images/Menu.png"
            alt="menu"
            width={18}
            height={18}
            className="absolute top-9 left-6"
          />
        </div>
        <div className="md:col-start-1 md:col-span-2 col-start-6 w-full h-full flex items-center sm:justify-center justify-start">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/images/Church-logo.jpg"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
        </div>

        <div className="hidden col-start-9 col-span-4 w-full h-full md:flex">
          <div className="flex flex-row gap-9 justify-center items-center w-full 2xl:flex-wrap pr-[190px]">
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
            <Link href="/sermons">Sermons</Link>
            {user === "ADMIN" ? <Link href="/media">Media</Link> : ""}
            {/* <Link href="/" className="hover:text-gray-700 duration-200">Blog</Link> */}
            {/* <Link href="/" className="hover:text-gray-700 duration-200">Support</Link> */}
          </div>
          <div className="w-auto h-auto sm:flex flex-row gap-2 absolute top-5 right-3 items-center">
            <SignedOut>
              <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 text-white">
                <Link href="/sign-in">Sign In</Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center justify-center p-3">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
      <Sheet>
        <div className="md:hidden grid-cols-12 grid h-full w-full">
          <SheetTrigger className="md:hidden col-start-1 col-span-1 relative">
            <Image
              src="/images/Menu.png"
              alt="logo"
              width={18}
              height={18}
              className="absolute top-9 left-6"
            />
          </SheetTrigger>
          <div className="absolute top-5 right-[11rem]">
            <Link href="/" className="cursoper-pointer">
              <Image
                src="/images/Church-logo.jpg"
                alt="logo"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <SheetContent>
            <SheetDescription>
              <div className="md:col-start-1 md:col-span-2 col-start-6 w-full h-full flex items-center sm:justify-center justify-center">
                <Link href="/" className="cursor-pointer">
                  <Image
                    src="/images/Church-logo.jpg"
                    alt="logo"
                    width={50}
                    height={50}
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
                  {/* <Link href="/" className="hover:text-gray-700 duration-200">Blog</Link> */}
                  {/* <Link href="/" className="hover:text-gray-700 duration-200">Support</Link> */}
                </div>
              </div>
            </SheetDescription>
          </SheetContent>
        </div>
      </Sheet>
    </div>
  );
};

export default Navbar2;
