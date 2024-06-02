import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl sm:text-6xl font-bold flex mt-48 text-center sm:w-1/2">
          Revive the church and evangelise the world.
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-center mt-5 sm:mt-10 mb-10 leading-5 w-[330px] sm:w-[496px]">
          We believe every born again child of God is a mobile altar, divinely
          enabled to offer sacrifices to God from a pure heart. A mobile altar
          does not visit Gods presence, he carries it.
        </p>
      </div>
    </>
  );
};

export default Hero;
