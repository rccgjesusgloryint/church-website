import Hero from "../../../components/Hero";
import GalleryPreview from "../../../components/GalleryPreview";
import EventsPreview from "../../../components/EventsPreview";
import Newsletter from "../../../components/Newsletter";

import React from "react";

export default async function Home() {
  return (
    <main>
      <Hero />
      <GalleryPreview />
      <EventsPreview />
      <Newsletter />
    </main>
  );
}
