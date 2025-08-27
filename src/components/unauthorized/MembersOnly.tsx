import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="p-4 text-center h-screen flex justify-center items-center flex-col relative">
      <div className="absolute left-2 top-5">
        <Link href="/" className="no-underline p-3 bg-black text-white">
          Back
        </Link>
      </div>
      <h1 className="text-3xl md:text-6xl">Unauthorized access!</h1>
      <p> Members only! Please sign in to access this page</p>
      <Link href="/api/auth/signin" className="mt-4 bg-black p-2 text-white">
        Sign in
      </Link>
    </div>
  );
};

export default Unauthorized;
