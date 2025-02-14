import { addEmailToNewsletter } from "@/lib/queries";
import { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

export const config = {
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
  events: {
    async signIn(message) {
      await addEmailToNewsletter(message.user.email as string);
    },
    async signOut() {},
    async createUser() {},
  },
} satisfies NextAuthConfig;
