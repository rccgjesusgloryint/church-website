import React from "react";

const Newsletter = () => {
  return (
    <section className="h-auto w-full">
      <div className="h-[558px] w-full bg-footer-bg bg-center bg-cover flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="flex flex-wrap font-bold sm:text-[45px] text-3xl sm:w-[675px] text-center sm:leading-[50px]">
            Subscribe Our Newsletter and Keep Up With Our Latest News
          </h1>
          <p className="font-normal text-lg w-4/5 text-white mt-3 text-center">
            We are committed to Jesus Christ, the Bible, and the Great
            Commission.
          </p>
          <div className="h-[71px] sm:w-[487px] w-full px-10 mt-5 flex flex-row">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              className="h-full w-full bg-black bg-opacity-55 pl-10 text-white"
            />
            <button className="bg-white sm:w-1/2 w-1/2 h-full">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
