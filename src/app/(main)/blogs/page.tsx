"use client";

import React from "react";
import { TEMP_BLOG_DATA, TEMP_BLOG_CATEGOORIES } from "./temp_data";
import Navbar2 from "../../../../components/navbar/Navbar2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

type BlogProps = {
  id: string;
  blogTitle: string;
  blogDescription: string;
  category?: string;
  createdAt?: Date;
};

const Blogs = (props: BlogProps) => {
  const router = useRouter();

  const handleBlogRedirection = (blogId: string) => {
    router.push(`/blogs/${blogId}/`);
  };
  return (
    <>
      <Navbar2 />
      <div className="h-screen w-full">
        <div className="flex flex-col flex-wrap gap-3 items-center pt-[10rem]">
          <div
            className="flex flex-col gap-5 max-w-[800px] relative"
            key={TEMP_BLOG_DATA[0].id}
          >
            <div className="absolute top-[25rem] right-[-15rem]">
              <h1 className="font-medium text-[20px] mb-3">All categories</h1>
              <div className="flex flex-col">
                {TEMP_BLOG_CATEGOORIES.map((category) => (
                  <span className="cursor-pointer">{category}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="">{TEMP_BLOG_DATA[0].createdAt}</div>
              <h1
                className="font-bold text-4xl cursor-pointer hover:text-gray-600"
                onClick={() => handleBlogRedirection(TEMP_BLOG_DATA[0].id)}
              >
                {TEMP_BLOG_DATA[0].blogTitle}
              </h1>
            </div>
            <Image
              alt="poster-image"
              src={TEMP_BLOG_DATA[0].blogPoster}
              width={800}
              height={50}
              className="cursor-pointer hover:opacity-80"
              onClick={() => handleBlogRedirection(TEMP_BLOG_DATA[0].id)}
            />
            <h1 className="font-normal">{TEMP_BLOG_DATA[0].blogDescription}</h1>
          </div>
          {TEMP_BLOG_DATA?.length !== 0 ? (
            TEMP_BLOG_DATA?.filter((num, index) => index > 0).map(
              (blog, index) => (
                <div
                  className="flex flex-row items-start gap-5 py-10 max-w-[800px] border-t-[1px] border-[#e0e0e0]"
                  key={index}
                >
                  <Image
                    alt="poster-image"
                    src={blog.blogPoster}
                    width={200}
                    height={150}
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => handleBlogRedirection(blog.id)}
                  />
                  <div className="flex flex-col gap-3">
                    <div className="">{blog.createdAt}</div>
                    <h1
                      className="font-bold text-2xl cursor-pointer hover:text-gray-600"
                      onClick={() => handleBlogRedirection(blog.id)}
                    >
                      {blog.blogTitle}
                    </h1>
                    <h1 className="font-normal">
                      {/* TO DO// When creating the form for posting blogs make the description cap at 450 characters */}
                      {blog.blogDescription.slice(0, 450)}
                    </h1>
                  </div>
                </div>
              )
            )
          ) : (
            <div>NO Blogs!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
