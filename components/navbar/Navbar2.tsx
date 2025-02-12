"use client";

import Image from "next/image";
import Link from "next/link";

import React from "react";

import { AuthButton2, MobileViewNavbar2, navContent } from ".";
import { accessCheck, isAdmin } from "@/lib/queries";
import { Role } from "@prisma/client";

const Navbar2 = () => {
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
    checkUserAdmin();
    checkUserRole();
  }, []);
  return (
    <div className="bg-white h-[100px] shadow-md w-full">
      <div className="h-full flex justify-end">
        <div className="hidden md:flex flex-row gap-9 justify-center items-center w-full 2xl:flex-wrap relative mr-10">
          <Link href="/" className="cursor-pointer absolute top-3 left-3">
            <Image
              src="/images/church-logo.svg"
              alt="logo"
              width={70}
              height={70}
            />
          </Link>
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
        </div>
        <AuthButton2 />
        <div className="md:hidden h-full w-full flex items-center justify-center relative">
          <MobileViewNavbar2 />
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
