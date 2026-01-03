"use client";

import React from "react";
import { useSession } from "next-auth/react";
import SignInButton from "../auth/SignIn";
import SignOutButton from "../auth/SignOut";

type AuthButtonProps = {
  variant?: "minimal" | "filled";
  className?: string;
};

/**
 * Unified authentication button component.
 * - "minimal": Simple sign in/out (used in original Navbar)
 * - "filled": Styled with primary background (used in Navbar2)
 */
const AuthButton = ({
  variant = "filled",
  className = "",
}: AuthButtonProps) => {
  const { status } = useSession();

  if (status === "loading") return null;

  const baseStyles = "flex justify-center items-center";
  const filledStyles =
    "bg-primary w-[100px] h-[60px] border-primary hover:bg-opacity-75 cursor-pointer duration-500 text-primary-foreground";
  const minimalStyles = "w-[100px] h-[60px]";

  const buttonStyles =
    variant === "filled"
      ? `${baseStyles} ${filledStyles}`
      : `${baseStyles} ${minimalStyles}`;

  return (
    <div className={`${buttonStyles} ${className}`} data-testid="auth-button">
      {status === "authenticated" ? <SignOutButton /> : <SignInButton />}
    </div>
  );
};

export default AuthButton;
