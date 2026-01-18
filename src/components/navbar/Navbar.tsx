"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useNavItems } from "@/hooks/useNavItems";
import { ModeToggle } from "@/components/toggle-mode";
import { Skeleton } from "@/components/ui/skeleton";
import AuthButton from "./AuthButton";
import MobileNav from "./MobileNav";

type NavbarProps = {
  variant?: "hero" | "standard";
};

/**
 * Unified Navbar component.
 * - "hero": Landing page style (no header bar, transparent, entrance animation)
 * - "standard": Inner page style (with logo, fixed header bar)
 */
const Navbar = ({ variant = "standard" }: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null);
  const { navItems, isActiveLink, isLoading } = useNavItems();

  const isHero = variant === "hero";
  const isStandard = variant === "standard";

  // GSAP entrance animation for hero variant
  useGSAP(() => {
    if (isHero && navRef.current) {
      gsap.from(navRef.current, {
        y: -30,
        duration: 1,
        opacity: 0,
      });
    }
  }, [isHero]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="w-screen flex items-center justify-center relative">
        <div className="flex gap-6 py-10">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-16 opacity-20" />
          ))}
        </div>
      </div>
    );
  }

  // Hero variant (landing page)
  if (isHero) {
    return (
      <div className="w-screen">
        <div
          className="relative"
          ref={navRef as React.RefObject<HTMLDivElement>}
        >
          <MobileNav variant="hero" />

          {/* Desktop navigation */}
          <div className="hidden sm:flex flex-row font-normal gap-7 justify-center items-center cursor-pointer h-full pt-11 mb-[10rem]">
            {navItems.map(({ label, link, external }) =>
              external ? (
                <a
                  href={link}
                  key={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary duration-200"
                >
                  {label}
                </a>
              ) : (
                <Link
                  href={link}
                  key={label}
                  className={`
                    hover:text-primary duration-200
                    ${isActiveLink(link) ? "text-primary font-semibold" : ""}
                  `}
                >
                  {label}
                </Link>
              ),
            )}
            <ModeToggle />
            <AuthButton variant="minimal" />
          </div>

          {/* Mobile auth button */}
          <div className="sm:hidden">
            <AuthButton variant="minimal" className="absolute top-7 right-5" />
          </div>
        </div>
      </div>
    );
  }

  // Standard variant (inner pages)
  return (
    <div className="bg-transparent h-[100px] shadow-md w-full flex items-center justify-center relative">
      {/* Logo - desktop only */}
      <Link
        href="/"
        className="hidden md:flex cursor-pointer absolute top-3 left-5"
      >
        <Image
          src="/images/church-logo.svg"
          alt="logo"
          width={70}
          height={70}
        />
      </Link>

      {/* Desktop controls */}
      <div className="hidden md:flex absolute top-5 right-5 gap-3">
        <span className="pt-2">
          <ModeToggle />
        </span>
        <AuthButton variant="filled" />
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden h-full w-full flex items-center justify-center">
        <MobileNav variant="standard" />
      </div>

      {/* Desktop navigation links */}
      <div className="hidden md:flex flex-row gap-9 justify-center items-center w-full 2xl:flex-wrap relative mr-10">
        {navItems.map(({ label, link, external }) =>
          external ? (
            <a
              href={link}
              key={label}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary duration-200"
            >
              {label}
            </a>
          ) : (
            <Link
              href={link}
              key={label}
              className={`
                hover:text-primary duration-200
                ${isActiveLink(link) ? "text-primary font-semibold" : ""}
              `}
            >
              {label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default Navbar;
