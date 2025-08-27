import Link from "next/link";
import React from "react";
import Arrow from "../../../../components/icons/Arrow";

const Leaders = () => {
  const subTitle1 = React.useRef<HTMLElement | any>();
  const title2 = React.useRef<HTMLElement | any>();
  const viewLink = React.useRef<HTMLElement | any>();

  return (
    <section className="h-auto w-full relative">
      <div className="flex flex-col items-start sm:px-[60px] px-5">
        <div className="flex flex-col w-full mt-11">
          <div
            className="flex flex-col items-start justify-end"
            ref={subTitle1}
          >
            <h3 className="tracking-widest">CHURCH OFFICERS</h3>
            <div className="bg-black opacity-55 w-[163px] h-[1px] mt-1 mb-0"></div>
          </div>
          <div className="flex flex-row items-center justify-start w-full relative">
            <h1 className="font-bold sm:text-[40px] text-[30px]" ref={title2}>
              Meet Our Wonderful Church Leaders
            </h1>
            <div
              className="flex items-center gap-3 font-bold hover:opacity-55 transition-opacity ease-in-out cursor-pointer absolute right-0 bottom-0"
              ref={viewLink}
            >
              <Link href="">VIEW ALL PASTORS</Link>
              <Arrow />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center flex-wrap gap-5 mt-[100px] w-full mb-11">
          <div className="sm:w-[273px] w-full h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
            <h1>Full Name</h1>
            <h3>Title</h3>
          </div>
          <div className="sm:w-[273px] w-full h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
            <h1>Full Name</h1>
            <h3>Title</h3>
          </div>
          <div className="sm:w-[273px] w-full h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
            <h1>Full Name</h1>
            <h3>Title</h3>
          </div>
          <div className="sm:w-[273px] w-full h-[400px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-4">
            <h1>Full Name</h1>
            <h3>Title</h3>
          </div>
        </div>
      </div>
      <div className="absolute w-full h-[200px] bg-dark-gr z-[-10] bottom-0"></div>
    </section>
  );
};

export default Leaders;
