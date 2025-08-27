import Link from "next/link";
import React from "react";

const ComingSoon = () => {
  return (
    <div className="p-4 text-center h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl md:text-6xl">Coming Soon!</h1>
      <Link href="/" className="mt-4 bg-primary p-2 text-white">
        Back to home
      </Link>
    </div>
  );
};

export default ComingSoon;
