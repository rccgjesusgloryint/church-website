"use client";

import { TEMP_BLOG_DATA } from "../temp_data";

import React from "react";
import Navbar2 from "../../../../../components/navbar/Navbar2";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Blog } from "@prisma/client";
import { getBlogWithId } from "@/lib/queries";

type BlogProps = {
  params: {
    blogId: string;
  };
};
// TO DO: use the blog id from the params to fetch the blog details

const Blogs = ({ params }: BlogProps) => {
  const [blog, setBlog] = React.useState<Blog | null>();
  const useTitle = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(useTitle.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
  });

  // React.useEffect(() => {
  //   const getBlog = async () => {
  //     const response = await getBlogWithId(params.blogId);
  //     setBlog(response);
  //   };

  //   getBlog();
  // }, []);
  return (
    <>
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar2 />
        <div className="h-full flex justify-center" ref={useTitle}>
          <div className="flex flex-col items-center justify-center text-white">
            <span className="bg-[#5B5966] w-auto  h-auto rounded flex items-center justify-center p-3 text-center">
              {TEMP_BLOG_DATA[0].category}
            </span>
            <h1 className="font-bold sm:text-[80px] text-[35px]">
              {TEMP_BLOG_DATA[0].blogTitle}
            </h1>
            <span className="text-[1rem] font-medium">
              {TEMP_BLOG_DATA[0].createdAt}
            </span>
          </div>
        </div>
      </section>
      <section className="h-screen w-full relative p-[15rem]">
        <span className="text-2xl font-normal">
          {TEMP_BLOG_DATA[0].blogContent}
        </span>
      </section>
      <section className="h-"></section>
    </>
  );
};

export default Blogs;
