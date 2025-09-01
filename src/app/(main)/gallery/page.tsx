import React from "react";
import Navbar2 from "../../../../components/navbar/Navbar2";

import { Metadata } from "next";
import GalleryComponent from "./GalleryComponent";
import ComingSoon from "@/components/comingsoon";

export const metadata: Metadata = {
  title: "Jesus Glory Athy - Gallery",
};

const Gallery = () => {
  return (
    <>
      {/* <Navbar2 />
      <GalleryComponent /> */}
      <ComingSoon />
    </>
  );
};

export default Gallery;
