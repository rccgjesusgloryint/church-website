"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { navContent } from "@/lib/constants";

type NavItem = {
  label: string;
  link: string;
  external?: boolean;
};

/**
 * Centralized hook for navbar items visibility logic.
 * Returns filtered nav items based on user auth state and role.
 */
export function useNavItems() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isSignedIn = status === "authenticated";
  const isLoading = status === "loading";

  // Check if user has admin privileges (anything other than MEMBER)
  const isAdmin = useMemo(() => {
    if (!session?.user) return false;
    // @ts-ignore - member field exists on user
    return session.user.member !== "MEMBER";
  }, [session]);

  const navItems = useMemo(() => {
    return navContent.filter(({ label }: NavItem) => {
      // Hide Admin link for non-admin users
      if (label === "Admin" && !isAdmin) return false;
      // Hide Roadmap for non-signed-in users
      if (label === "Roadmap" && !isSignedIn) return false;
      return true;
    });
  }, [isAdmin, isSignedIn]);

  const isActiveLink = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname.startsWith(link);
  };

  return {
    navItems,
    isSignedIn,
    isAdmin,
    isLoading,
    isActiveLink,
    pathname,
  };
}
