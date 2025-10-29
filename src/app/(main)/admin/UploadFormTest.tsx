"use client";
import { getImages, saveImage } from "@/lib/queries";
import { DbImage } from "@/lib/types";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";

type Props = {};

const UploadFormTest = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      console.log("form: ", form);
      fetch(`/api/upload/file`, {
        method: "POST",
        body: form,
      });
    } catch (error) {
      alert(`Whoops ${error}`);
    }
  };
  return (
    <div className="">
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-5">
        <input id="file" name="file" type="file" accept="image/*" required />
        <input
          id="filename"
          name="filename"
          type="text"
          placeholder="filename"
        />
        <input id="bucket" name="bucket" type="text" placeholder="bucket" />
        <input id="event" name="event" type="text" placeholder="event" />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default UploadFormTest;
