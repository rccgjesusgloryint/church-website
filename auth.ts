import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { config } from "./auth.config";
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "database",
    maxAge: 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  ...config,
});
