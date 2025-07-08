import React from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";

const AuthButton2 = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center justify-center">
      {status === "authenticated" ? (
        <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 text-white">
          <Link href="/api/auth/signout">Sign Out</Link>
        </div>
      ) : status === "unauthenticated" ? (
        <div className="flex justify-center items-center bg-gray-700 w-[100px] h-[60px] border-gray-700 hover:bg-opacity-75 cursor-pointer duration-500 text-white">
          <Link href="/api/auth/signin">Sign In</Link>
        </div>
      ) : null}
      {/* <div className="flex items-center justify-center p-3"></div> */}
    </div>
  );
};

export default AuthButton2;
