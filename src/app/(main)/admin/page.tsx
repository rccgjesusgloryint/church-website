"use client";

import React from "react";
import MediaPage from "../../../../components/media";
import CreateEvent from "../../../../components/events";
import CreateSermonForm from "../../../../components/sermons/create-sermon-form";
import Navbar2 from "../../../../components/Navbar2";

const page = () => {
  return (
    <main className="w-full h-full">
      <Navbar2 />
      <h1 className="flex items-center justify-center text-xl mt-8">
        Admin Page
      </h1>
      <MediaPage />
      <CreateEvent />
      <CreateSermonForm />
    </main>
  );
};

export default page;
