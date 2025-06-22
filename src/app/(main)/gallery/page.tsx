import React from "react";
import Navbar2 from "../../../../components/navbar/Navbar2";

import { Metadata } from "next";
import GalleryComponent from "./GalleryComponent";

export const metadata: Metadata = {
  title: "Jesus Glory Athy - Gallery",
};

const Gallery = () => {
  return (
    <>
      <Navbar2 />
      <GalleryComponent />
    </>
  );
};

export default Gallery;
