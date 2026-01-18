import type { Metadata } from "next";
import { DM_Sans } from "next/font/google"; // Importing DM Sans
import "./globals.css";

import { Toaster } from "react-hot-toast";
import ModalProvider from "@/providers/modal-provider";

import { auth } from "@/auth";

import { AuthProvider } from "../providers/AuthProvider";

import LiveStreamButton from "@/components/LiveStreamButton";
import { ThemeProvider } from "@/components/theme-provider";
import { getLastSundayOfTheMonth } from "@/lib/actions";
import FeedbackComponent from "@/components/feedback/page";
import RoadmapToastProvider from "@/components/roadmap/RoadmapToastProvider";

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
    emails: "rccgjesusgloryint@gmail.com",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    title: "Jesus Glory Athy",
    countryName: "Ireland",
    description: "Jesus Glory International, based in Athy Co.Kildare",
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

  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={dmSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider session={session as any}>
            <ModalProvider>{children}</ModalProvider>
            <FeedbackComponent />
            <RoadmapToastProvider />
            <LiveStreamButton
              channelUrl={
                "https://www.youtube.com/@rccgjesusgloryinternationa5350/live"
              }
            />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
