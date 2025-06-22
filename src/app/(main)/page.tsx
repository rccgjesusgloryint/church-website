import Hero from "../../../components/Hero";
import EventsPreview from "../../../components/events/EventsPreview";
import Newsletter from "../../../components/Newsletter";

import React from "react";
import GalleryPreview from "../../../components/gallery/GalleryPreview";
import Footer from "../../../components/Footer";
import Head from "next/head";

export default async function Home() {
  return (
    <main>
      <Head>
        <title>Home</title>
      </Head>
      <Hero />
      <GalleryPreview />
      <EventsPreview />
      <Newsletter />
      <Footer />
    </main>
  );
}
