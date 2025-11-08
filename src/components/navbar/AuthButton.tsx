import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthButton = () => {
  const { data: session, status } = useSession();
  return (
    <div
      className=" w-[100px] h-[60px] absolute top-7 right-5"
      data-testid="auth-button"
    >
      {status === "authenticated" ? (
        <Link
          href="/api/auth/signout"
          className="w-full h-full flex justify-center items-center bg-primary border-primary hover:bg-opacity-75 cursor-pointer duration-500 text-primary-foreground "
        >
          Sign Out
        </Link>
      ) : status === "unauthenticated" ? (
        <Link
          href="/api/auth/signin"
          className="w-full h-full flex justify-center items-center bg-primary border-primary hover:bg-opacity-75 cursor-pointer duration-500 text-primary-foreground "
        >
          Sign In
        </Link>
      ) : null}
    </div>
  );
};

export default AuthButton;
