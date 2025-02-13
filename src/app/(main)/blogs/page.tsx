"use client";

import React from "react";
import { TEMP_BLOG_CATEGOORIES } from "./temp_data";
import Navbar2 from "../../../../components/navbar/Navbar2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAllBlogs } from "@/lib/queries";
import { Blog } from "@prisma/client";

const Blogs = () => {
  const [blogs, setBlogs] = React.useState<Blog[]>();
  const router = useRouter();

  const handleBlogRedirection = (blogId: string) => {
    router.push(`/blogs/${blogId}/`);
  };

  React.useEffect(() => {
    const getData = async () => {
      const response = await getAllBlogs();
      setBlogs(response);
    };
    getData();
  }, []);

  if (!blogs) return <div>No Blogs </div>;

  return (
    <>
      <Navbar2 />
      <div className="h-screen w-full">
        <div className="flex flex-col flex-wrap gap-3 items-center pt-[10rem]">
          <div
            className="flex flex-col gap-5 max-h-[800px] relative"
            key={blogs[0]?.id}
          >
            <div className="absolute top-[25rem] right-[-15rem]">
              <h1 className="font-medium text-[20px] mb-3">All categories</h1>
              <div className="flex flex-col">
                {TEMP_BLOG_CATEGOORIES.map((category) => (
                  <span className="cursor-pointer" key={category}>
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="">
                {blogs[0]?.createdAt.toDateString().slice(3)}
              </div>
              <h1
                className="font-bold text-4xl cursor-pointer hover:text-gray-600"
                onClick={() => handleBlogRedirection(blogs[0]?.id)}
              >
                {blogs[0]?.blogTitle}
              </h1>
            </div>
            <Image
              alt="poster-image"
              src={
                blogs[0]?.blogImage ||
                "https://www.1689designs.com/cdn/shop/files/all-over-print-flag-white-front-6604d51e7e80c.png?v=1711592746"
              }
              width={500}
              height={500}
              className="cursor-pointer hover:opacity-80 max-h-[500px] object-contain"
              onClick={() => handleBlogRedirection(blogs[0]?.id)}
            />
            <h1 className="font-normal">{blogs[0]?.blogDescription}</h1>
          </div>
          {blogs?.length !== 0 ? (
            blogs
              ?.filter((num, index) => index > 0)
              .map((blog, index) => (
                <div
                  className="flex flex-row items-start gap-5 py-10 max-w-[800px] border-t-[1px] border-[#e0e0e0]"
                  key={blog.id}
                >
                  <Image
                    alt="poster-image"
                    src={
                      blog.blogImage ||
                      "https://www.1689designs.com/cdn/shop/files/all-over-print-flag-white-front-6604d51e7e80c.png?v=1711592746"
                    }
                    width={200}
                    height={150}
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => handleBlogRedirection(blog.id)}
                  />
                  <div className="flex flex-col gap-3">
                    <div className="">
                      {blog.createdAt.toDateString().slice(3)}
                    </div>
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
              ))
          ) : (
            <div>NO Blogs!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
