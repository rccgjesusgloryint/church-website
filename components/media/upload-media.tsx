"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MultiplFileUpload from "./multiple-file-upload";

const UploadMediaForm = () => {
  return (
    <Card className="w-auto h-auto mt-5">
      <CardHeader>
        <CardTitle>Add Images To Gallery</CardTitle>
      </CardHeader>
      <CardContent className="w-auto">
        <MultiplFileUpload apiEndpoint="pictures" />
      </CardContent>
    </Card>
  );
};

export default UploadMediaForm;
