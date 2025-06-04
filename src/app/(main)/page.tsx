import Hero from "../../../components/Hero";
import EventsPreview from "../../../components/events/EventsPreview";
import Newsletter from "../../../components/Newsletter";

import React from "react";
import GalleryPreview from "../../../components/gallery/GalleryPreview";
import Footer from "../../../components/Footer";

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
