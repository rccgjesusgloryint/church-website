import React from "react";

type Props = {
  className?: string;
};

const Arrow = ({ className }: Props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
  >
    <rect width="20" height="20" fill="currentColor" />
  </svg>
);

export default Arrow;
