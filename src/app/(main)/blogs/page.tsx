"use client";

import { FaShareFromSquare } from "react-icons/fa6";

import React from "react";

import Navbar2 from "../../../../components/navbar/Navbar2";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAllBlogs, getBlogCategories } from "@/lib/queries";
import { Blog } from "@prisma/client";
import Loader from "../../../../components/Loader";
import { BlogType } from "@/lib/types";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Footer from "../../../../components/Footer";

const Blogs = () => {
  const [blogs, setBlogs] = React.useState<Blog[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<any>([]);
  const router = useRouter();

  const handleBlogRedirection = (blogId: string) => {
    router.push(`/blogs/${blogId}/`);
  };

  React.useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await getAllBlogs();
      const sortedBlogs = response.sort(
        (a: BlogType, b: BlogType) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );
      setBlogs(sortedBlogs);

      const categoriesFromDb = await getBlogCategories();
      //filter categories to remove duplicate categories
      let uniqueCategories = categoriesFromDb.filter(
        (item, index) => categoriesFromDb.indexOf(item) === index
      );
      setCategories(uniqueCategories);
      setIsLoading(false);
    };
    getData();
  }, []);

  const handleShareFunc = (id: string) => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${id}`
    );
  };

  return (
    <>
      <Navbar2 />
      <div className="h-screen w-full">
        {isLoading ? (
          <div className="h-screen flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col flex-wrap gap-3 items-center py-[7rem] sm:pt-[10rem] relative">
            {blogs && blogs.length > 0 && (
              <div
                className="flex flex-col gap-5 sm:max-h-[800px] relative px-5 sm:p-0"
                key={blogs[0]?.id}
              >
                <div className="absolute top-[25rem] right-[-15rem] hidden sm:block">
                  <h1 className="font-medium text-[20px] mb-3">
                    All categories
                  </h1>
                  <div className="flex flex-col">
                    {categories?.map((category: any) => (
                      <span className="" key={category}>
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
                <h1 className="font-normal max-w-[818px]">
                  {blogs[0]?.blogDescription}
                </h1>
              </div>
            )}
            {blogs?.length !== 0 ? (
              blogs
                ?.filter((num, index) => index > 0)
                .map((blog, index) => (
                  <div
                    className="flex sm:flex-row flex-col items-start gap-5 py-10 px-5 max-w-[800px] border-t-[1px] border-[#e0e0e0] relative"
                    key={blog.id}
                  >
                    <span className="absolute top-5 right-2">
                      <HoverCard openDelay={100}>
                        <HoverCardTrigger>
                          <FaShareFromSquare
                            className="cursor-pointer"
                            onClick={() => handleShareFunc(blog.id)}
                          />
                        </HoverCardTrigger>
                        <HoverCardContent
                          className="w-auto bg-black !border-black"
                          style={{ padding: "3px" }}
                        >
                          <span className="text-white">Share Blog</span>
                        </HoverCardContent>
                      </HoverCard>
                    </span>

                    <Image
                      alt="poster-image"
                      src={
                        blog.blogImage ||
                        "https://www.1689designs.com/cdn/shop/files/all-over-print-flag-white-front-6604d51e7e80c.png?v=1711592746"
                      }
                      width={500}
                      height={150}
                      className="cursor-pointer hover:opacity-80 sm:w-[200px]"
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
                      <h1 className="font-normal max-w-[818px]">
                        {/* TO DO// When creating the form for posting blogs make the description cap at 450 characters */}
                        {blog.blogDescription.slice(0, 450)}
                      </h1>
                    </div>
                  </div>
                ))
            ) : (
              <div className="h-screen">No blogs have been posted yet</div>
            )}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Blogs;
