"use client";

import Hero from "../../components/Hero";
import AboutUsPreview from "../../components/AboutUsPreview";
import OurMinistries from "../../components/OurMinistries";
import GalleryPreview from "../../components/GalleryPreview";
import EventsPreview from "../../components/EventsPreview";
import Newsletter from "../../components/Newsletter";

import React from "react";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUsPreview />
      <OurMinistries />
      <GalleryPreview />
      <EventsPreview />
      <Newsletter />
      {/* <Footer /> */}
    </main>
  );
}
