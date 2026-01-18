"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavItems } from "@/hooks/useNavItems";
import AuthButton from "./AuthButton";

type MobileNavProps = {
  variant?: "hero" | "standard";
};

/**
 * Unified mobile navigation component.
 * - "hero": Used on landing page (no logo in header, just menu trigger)
 * - "standard": Used on inner pages (shows logo and auth button in header)
 */
const MobileNav = ({ variant = "standard" }: MobileNavProps) => {
  const { navItems, isActiveLink, isLoading } = useNavItems();

  if (isLoading) return null;

  const isStandard = variant === "standard";
  const triggerClass = isStandard
    ? "md:hidden absolute top-9 left-5"
    : "sm:hidden w-[100px] h-[100px]";

  return (
    <>
      <Sheet>
        <SheetTrigger className={triggerClass} data-testid="mobile-view-navbar">
          <Image
            src={isStandard ? "/images/Menu.png" : "/menu-icon.svg"}
            alt="menu"
            width={isStandard ? 24 : 50}
            height={isStandard ? 24 : 50}
            className={isStandard ? "" : "absolute top-7 left-5"}
          />
        </SheetTrigger>

        {/* Standard variant: Show auth button and centered logo in mobile header */}
        {isStandard && (
          <>
            <div className="absolute right-3 top-5">
              <AuthButton variant="filled" />
            </div>
            <div className="flex items-center justify-center">
              <Link href="/" className="cursor-pointer">
                <Image
                  src="/images/church-logo.svg"
                  alt="church-logo"
                  width={70}
                  height={70}
                />
              </Link>
            </div>
          </>
        )}

        <SheetContent className="w-3/5" side="left">
          <SheetDescription>
            {/* Logo inside sheet */}
            <div className="w-full h-full flex items-center justify-center">
              <Link href="/" className="cursor-pointer">
                <Image
                  src="/images/church-logo.svg"
                  alt="church-logo"
                  width={70}
                  height={70}
                />
              </Link>
            </div>

            {/* Navigation links */}
            <div className="flex w-full h-full items-center justify-start pl-11">
              <div className="flex flex-col gap-8 flex-wrap mt-10 w-full">
                {navItems.map(({ label, link, external }) =>
                  external ? (
                    <a
                      href={link}
                      key={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        active:bg-primary/10 bg-none w-full flex justify-start items-center 
                        pl-4 rounded-sm transition ease-in text-xl
                      `}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={link}
                      key={label}
                      className={`
                        active:bg-primary/10 bg-none w-full flex justify-start items-center 
                        pl-4 rounded-sm transition ease-in text-xl
                        ${isActiveLink(link) ? "text-primary font-semibold" : ""}
                      `}
                    >
                      {label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
