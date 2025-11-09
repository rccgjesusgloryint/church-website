import React from "react";

const Loader = () => {
  return (
    <div className="animate-pulse flex flex-col items-center gap-4 w-60">
      <div>
        <div className="w-48 h-6 bg-muted rounded-md"></div>
        <div className="w-28 h-4 bg-muted mx-auto mt-3 rounded-md"></div>
      </div>
      <div className="h-7 bg-muted w-full rounded-md"></div>
      <div className="h-7 bg-muted w-full rounded-md"></div>
      <div className="h-7 bg-muted w-full rounded-md"></div>
      <div className="h-7 bg-muted w-1/2 rounded-md"></div>
    </div>
  );
};

export default Loader;
