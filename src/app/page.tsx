"use client";

import Hero from "../../components/Hero";
import AboutUsPreview from "../../components/AboutUsPreview";
import OurMinistries from "../../components/OurMinistries";
import GalleryPreview from "../../components/GalleryPreview";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUsPreview />
      <OurMinistries />
      <GalleryPreview />
    </main>
  );
}
