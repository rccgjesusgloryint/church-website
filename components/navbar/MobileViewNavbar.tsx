import React from "react";

import Image from "next/image";
import menu_icon from "../../public/menu-icon.svg";

import { isAdmin } from "@/lib/queries";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navContent } from "@/lib/constants";
import Link from "next/link";

const MobileViewNavbar = () => {
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
      <SheetTrigger
        className="sm:hidden w-[100px] h-[100px]"
        data-testid="mobile-view-navbar"
      >
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

export default MobileViewNavbar;
