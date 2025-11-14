import { signIn, signOut } from "@/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SignInButton from "../auth/SignIn";
import SignOutButton from "../auth/SignOut";

const AuthButton = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  console.log("pathname: ", pathname);
  return (
    <div
      className=" w-[100px] h-[60px] absolute top-7 right-5"
      data-testid="auth-button"
    >
      {status === "authenticated" ? (
        <SignOutButton />
      ) : status === "unauthenticated" ? (
        <SignInButton redirect={pathname} />
      ) : null}
    </div>
  );
};

export default AuthButton;
