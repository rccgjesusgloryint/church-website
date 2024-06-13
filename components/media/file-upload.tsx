import { UploadDropzone } from "@/lib/uploadthing";
import React from "react";

type Props = {
  apiEndpoint: "pictures";
  value?: string;
  onChange: (url?: string) => void;
};

const FileUpload = ({ apiEndpoint, value, onChange }: Props) => {
  const type = value?.split(".").pop();
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
