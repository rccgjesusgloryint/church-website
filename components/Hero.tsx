import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-6xl font-bold flex mt-48 text-center">
          Revive the church and <br />
          evangelise the world.
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-center mt-10 mb-10 leading-5">
          We believe every born again child of God is a mobile altar, divinely
          <br />
          enabled to offer sacrifices to God from a pure heart. A mobile altar
          <br />
          doesn't visit God's presence, he carries it.
        </p>
      </div>
    </>
  );
};

export default Hero;
