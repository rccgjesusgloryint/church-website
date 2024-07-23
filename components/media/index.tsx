import React from "react";
import UploadMediaForm from "./upload-media";

const MediaPage = () => {
  return (
    <section className="h-screen bg-red-300">
      <h1 className="font-bold text-lg">Add Media Form</h1>
      <UploadMediaForm />
    </section>
  );
};

export default MediaPage;
