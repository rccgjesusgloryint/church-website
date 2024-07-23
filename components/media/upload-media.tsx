"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import MultiplFileUpload from "./multiple-file-upload";

const UploadMediaForm = () => {
  return (
    <Card className="w-auto h-auto mt-5">
      <CardContent>
        <MultiplFileUpload apiEndpoint="pictures" />
      </CardContent>
    </Card>
  );
};

export default UploadMediaForm;
