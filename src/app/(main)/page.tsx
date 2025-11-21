import React from "react";

import type { Metadata } from "next";
import Hero from "@/components/landing-page/Hero";
import GalleryPreview from "@/components/gallery/GalleryPreview";
import EventsPreview from "@/components/events/EventsPreview";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Jesus Glory Athy | RCCG Church in Athy, Ireland",
  description:
    "Welcome to Jesus Glory Athy, a vibrant Redeemed Christian Church of God (RCCG) community in Athy, Ireland. Join us for worship, events, and fellowship.",
  keywords: [
    "RCCG",
    "Jesus Glory Athy",
    "Church in Athy",
    "Christian Church Ireland",
    "Redeemed Christian Church",
    "Worship in Athy",
  ],
  openGraph: {
    title: "Jesus Glory Athy | RCCG Church in Athy, Ireland",
    description:
      "Welcome to Jesus Glory Athy, a vibrant RCCG community in Athy, Ireland. Join us for worship and fellowship.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "Jesus Glory Athy",
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus Glory Athy | RCCG Church in Athy, Ireland",
    description:
      "Welcome to Jesus Glory Athy, a vibrant RCCG community in Athy, Ireland.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  },
};

export default async function Home() {
  return (
    <main>
      <Hero />
      <GalleryPreview />
      <EventsPreview />
      <Newsletter />
      <Footer />
    </main>
  );
}
