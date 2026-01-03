"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface AuthProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider
      session={session}
      // Disable automatic refetching to prevent auth spam
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}
