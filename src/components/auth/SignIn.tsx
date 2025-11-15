"use client";
import { signIn } from "@/auth";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const SignInButton = () => {
  const pathname = usePathname();
  return (
    <button
      onClick={() => signIn("google", { redirectTo: pathname })}
      className="w-full h-full flex justify-center items-center bg-primary border-primary hover:bg-opacity-75 cursor-pointer duration-500 text-primary-foreground"
    >
      Sign In
    </button>
  );
};

export default SignInButton;
