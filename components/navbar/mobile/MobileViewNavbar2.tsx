import React from "react";

import Image from "next/image";
import menu_icon from "../../public/menu-icon.svg";

import { accessCheck, isAdmin } from "@/lib/queries";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navContent } from "@/lib/constants";
import Link from "next/link";
import { Role } from "@prisma/client";
import { ModeToggle } from "@/components/toggle-mode";
import { useNavbarAuth } from "@/hooks/useNavbarAuth";

const MobileViewNavbar2 = () => {
  const { admin } = useNavbarAuth();
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
      <SheetContent className="w-3/5" side="left">
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

export default MobileViewNavbar2;
