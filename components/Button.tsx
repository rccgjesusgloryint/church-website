import React from "react";

type Props = {};

const Button = (props: Props) => {
  return (
    <>
      <div className="flex justify-center items-center bg-gray-700 w-[210px] h-[60px] border-gray-700 hover:bg-transparent hover:border-2 hover:text-gray-700 duration-500">
        <p>LEARN MORE NOW</p>
      </div>
    </>
  );
};

export default Button;
