import Link from "next/link";
import React from "react";
import SignInButton from "../auth/SignIn";

const Unauthorized = () => {
  return (
    <div className="p-4 text-center h-screen flex justify-center items-center flex-col relative">
      <div className="absolute left-2 top-5">
        <Link
          href="/"
          className="no-underline p-3 bg-primary text-primary-foreground"
        >
          Back
        </Link>
      </div>
      <h1 className="text-3xl md:text-6xl">Unauthorized access!</h1>
      <p> Members only! Please sign in to access this page</p>
      <div className="mt-4 w-[100px] h-[50px]">
        <SignInButton />
      </div>
    </div>
  );
};

export default Unauthorized;
