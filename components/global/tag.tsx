import React from "react";
import clsx from "clsx";

interface TagComponentProps {
  title: string;
  id: number;
}

const TagComponent: React.FC<TagComponentProps> = ({ title, id }) => {
  return (
    <div className="p-2 rounded-sm flex-shrink-0 text-xs cursor-pointer bg-[#ffac7e]/10 text-[#ffac7e]">
      {title}
    </div>
  );
};

export default TagComponent;
