import EventsPreview from "../../../components/events/EventsPreview";
import Newsletter from "../../../components/Newsletter";

import React from "react";
import GalleryPreview from "../../../components/gallery/GalleryPreview";
import Footer from "../../../components/Footer";

import type { Metadata } from "next";
import Hero from "@/../components/landing-page/Hero";

export const metadata: Metadata = {
  title: "Jesus Glory Athy - Home",
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
