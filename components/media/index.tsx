import React from "react";
import Navbar from "../Navbar";
import UploadMediaForm from "./upload-media";
import CreateSermonForm from "../sermons/create-sermon-form";

const MediaPage = () => {
  return (
    <section>
      <Navbar />
      <UploadMediaForm />
    </section>
  );
};

export default MediaPage;
