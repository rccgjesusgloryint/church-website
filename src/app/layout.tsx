import type { Metadata } from "next";
import { DM_Sans } from "next/font/google"; // Importing DM Sans
import "./globals.css";

import { Toaster } from "react-hot-toast";
import ModalProvider from "@/providers/modal-provider";

import { auth } from "@/auth";

import { AuthProvider } from "../../components/AuthProvider";

// Configure DM Sans font with the desired weights
const dmSans = DM_Sans({
  style: "normal",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jesus Glory Athy",
  description: "Local Church Website in Athy Co.Kildare",
};

export const fetchCache = "default-no-store";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={dmSans.className}>
        <AuthProvider session={session as any}>
          <ModalProvider>{children}</ModalProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
