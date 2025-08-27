import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  apiEndpoint: "pictures" | "eventPosterImage" | "blogImage";
  value?: string;
  onChange: (url?: string) => void;
};

const FileUpload = ({ apiEndpoint, value, onChange }: Props) => {
  const type = value?.split(".").pop();
  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== "pdf" ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="l-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button onClick={() => onChange("")} variant="ghost" type="button">
          <X className="h-4 w-4" /> Remove Image
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default FileUpload;
