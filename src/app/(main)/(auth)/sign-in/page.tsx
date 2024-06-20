import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center mt-[200px]">
      <SignIn routing="hash" />
    </div>
  );
};

export default page;
