import { signIn } from "next-auth/react";
import React from "react";

type Props = {
  redirect: string;
};

const SignInButton = ({ redirect }: Props) => {
  return (
    <button
      onClick={() => signIn("google", { redirectTo: redirect })}
      className="w-full h-full flex justify-center items-center bg-primary border-primary hover:bg-opacity-75 cursor-pointer duration-500 text-primary-foreground "
    >
      Sign In
    </button>
  );
};

export default SignInButton;
