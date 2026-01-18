import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Role } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAdminRole(role: Role | undefined | null): boolean {
  if (!role) return false;
  return ["ADMIN_GENERAL", "ADMIN_MODERATE", "ADMIN_FULL", "OWNER"].includes(
    role,
  );
}
