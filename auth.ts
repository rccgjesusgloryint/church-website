import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { PrismaClient } from "@prisma/client";

import { config } from "./auth.config";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "database",
    maxAge: 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  ...config,
});
