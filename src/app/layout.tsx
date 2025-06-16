import type { Metadata } from "next";
import { DM_Sans } from "next/font/google"; // Importing DM Sans
import "./globals.css";

import { Toaster } from "react-hot-toast";
import ModalProvider from "@/providers/modal-provider";

import { auth } from "@/auth";

import { AuthProvider } from "../../components/AuthProvider";
import { isLive } from "@/lib/queries";

// Configure DM Sans font with the desired weights
const dmSans = DM_Sans({
  style: "normal",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    title: "Jesus Glory Athy",
    countryName: "Ireland",
    description: "Local Church Website in Athy Co.Kildare",
    siteName: "Jesus Glory International",
    images: [
      {
        url: "public/images/church-logo.svg",
      },
    ],
  },
};

export const fetchCache = "default-no-store";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const liveStreaming = (await isLive()) as boolean;
  console.log("livestreaming: ", liveStreaming);

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
