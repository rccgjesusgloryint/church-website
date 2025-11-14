import { signIn, signOut } from "next-auth/react";
import React from "react";

type Props = {};

const SignOutButton = (props: Props) => {
  return (
    <button
      onClick={() => signOut()}
      className="w-full h-full flex justify-center items-center bg-primary border-primary hover:bg-opacity-75 cursor-pointer duration-500 text-primary-foreground "
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
