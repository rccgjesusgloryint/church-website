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
      console.log("Signed In!", { message });
    },
    async signOut(message) {
      console.log("Signed Out!", { message });
    },
    async createUser(message) {
      console.log("User Created!", { message });
    },
  },
} satisfies NextAuthConfig;
