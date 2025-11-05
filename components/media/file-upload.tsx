"use client";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { SingleImageInput } from "./single-image-upload";

type Props = {
  onChange: (file: File | null) => void;
  value: File | null;
};

const FileUpload = ({ onChange, value }: Props) => {
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
    <div className="space-y-2">
      <Label htmlFor="post-image">
        Cover Image <span className="text-destructive">*</span>
      </Label>
      <SingleImageInput value={value} onChange={onChange} />
    </div>
  );
};

export default FileUpload;
