"use client";

import React from "react";
import { TEMP_BLOG_CATEGOORIES } from "./temp_data";
import Navbar2 from "../../../../components/navbar/Navbar2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAllBlogs, getBlogCategories } from "@/lib/queries";
import { Blog } from "@prisma/client";
import Loader from "../../../../components/Loader";

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
      const categoriesFromDb = await getBlogCategories();
      setBlogs(response);
      //filter categories to remove duplicate categories
      let uniqueCategories = categoriesFromDb.filter(
        (item, index) => categoriesFromDb.indexOf(item) === index
      );
      setCategories(uniqueCategories);
      setIsLoading(false);
    };
    getData();
  }, []);

  // if (!blogs) return false;

  return (
    <>
      <Navbar2 />
      <div className="h-screen w-full">
        {isLoading ? (
          <div className="h-screen flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col flex-wrap gap-3 items-center py-[7rem] sm:pt-[10rem]">
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
                    className="flex sm:flex-row flex-col items-start gap-5 py-10 px-5 max-w-[800px] border-t-[1px] border-[#e0e0e0]"
                    key={blog.id}
                  >
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
      </div>
    </>
  );
};

export default Blogs;
