import React from "react";
import Navbar from "../Navbar";
import UploadMediaForm from "./upload-media";

type Props = {};

const MediaPage = (props: Props) => {
  return (
    <section>
      <Navbar />
      <UploadMediaForm />
    </section>
  );
};

export default MediaPage;
