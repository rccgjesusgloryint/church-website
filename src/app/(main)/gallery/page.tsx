import React from "react";

import { Metadata } from "next";
import GalleryComponent from "./GalleryComponent";
import ComingSoon from "@/components/comingsoon";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Photo Gallery | Jesus Glory Athy",
  description:
    "Browse our photo gallery featuring events, services, and community moments at Jesus Glory Athy RCCG church in Athy, Ireland.",
  openGraph: {
    title: "Photo Gallery | Jesus Glory Athy",
    description:
      "Browse our photo gallery featuring events and community moments at Jesus Glory Athy.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | Jesus Glory Athy",
    description:
      "Browse our photo gallery featuring events and community moments.",
  },
};

const Gallery = () => {
  return (
    <>
      <Navbar />
      <GalleryComponent />
      {/* <ComingSoon /> */}
    </>
  );
};

export default Gallery;
