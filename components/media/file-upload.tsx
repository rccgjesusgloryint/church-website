"use client";
import Image from "next/image";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";

type Props = {
  onChange: (file: File) => void;
};

const FileUpload = ({ onChange }: Props) => {
  const [url, setUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) {
      return alert("NO LINKS");
    }
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch(`/api/upload/file`, {
        method: "POST",
        body: form,
      });

      setUrl(response.url as string);
      console.log("url: ", url);
    } catch (error) {
      alert(`Whoops ${error}`);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-5">
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files![0];
            const url = URL.createObjectURL(file);
            onChange(file);
            setPreviewUrl(url);
            console.log("file: ", file);
          }}
          required
        />
        {/* <input
          id="filename"
          name="filename"
          type="text"
          placeholder="filename"
        /> */}
        {/* <button type="submit">Upload File</button> */}
      </form>
      {previewUrl && (
        <Image src={previewUrl} alt="preview-image" width={500} height={500} />
      )}
    </div>
  );
};

export default FileUpload;
