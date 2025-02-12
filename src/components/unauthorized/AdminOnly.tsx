import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="p-4 text-center h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl md:text-6xl">Unauthorized access!</h1>
      <p> Admin only! Please contact support to get access</p>
      <Link href="/" className="mt-4 bg-primary p-2 text-white">
        Back to home
      </Link>
    </div>
  );
};

export default Unauthorized;
