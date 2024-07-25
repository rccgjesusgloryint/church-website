import React from "react";
import UploadMediaForm from "./upload-media";

const MediaPage = () => {
  return (
    <section className="h-auto w-full bg-slate-400 p-5">
      <h1 className="font-bold text-lg">Add Images To Gallery</h1>
      <UploadMediaForm />
    </section>
  );
};

export default MediaPage;
