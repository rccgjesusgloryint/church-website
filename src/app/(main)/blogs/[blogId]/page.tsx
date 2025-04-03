"use client";

import React from "react";
import Navbar2 from "../../../../../components/navbar/Navbar2";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Blog } from "@prisma/client";
import { findUser, getBlogWithId } from "@/lib/queries";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

type BlogProps = {
  params: {
    blogId: string;
  };
};

const Blogs = ({ params }: BlogProps) => {
  const [blog, setBlog] = React.useState<Blog | null>(null);
  const [author, setAuthor] = React.useState<string | null>(null);
  const useTitle = React.useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (useTitle.current) {
      gsap.from(useTitle.current, {
        y: 300,
        duration: 1,
        opacity: 0,
      });
    }
  });

  React.useEffect(() => {
    const getBlog = async () => {
      const response = await getBlogWithId(params.blogId);
      const blog_author = await findUser(response.blogAuthor);
      setBlog(response);
      if (!blog_author) return alert("No author found");
      setAuthor(blog_author);
    };
    getBlog();
  }, [params.blogId]);

  React.useEffect(() => {
    console.log(blog);
    console.log(author);
  }, [blog, author]);

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar2 />
        <div className="h-full flex justify-center" ref={useTitle}>
          <div className="flex flex-col items-center justify-center text-white">
            <span className="bg-[#5B5966] w-auto h-auto rounded flex items-center justify-center p-3 text-center">
              {blog?.category}
            </span>
            <h1 className="font-bold text-[25px] m-5">{blog?.blogTitle}</h1>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[1rem] font-medium">
                {blog?.createdAt.toDateString().slice(3)}
              </span>
              {/* <span className="text-[1rem] font-medium">by {author}</span> */}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="h-auto border flex items-center justify-center py-[15rem]">
        <div
          className="blog-content max-w-[1000px] h-auto text-2xl font-normal break-words overflow-wrap px-5"
          dangerouslySetInnerHTML={{
            __html: blog?.blogContent
              ? DOMPurify.sanitize(blog.blogContent)
              : "",
          }}
        />
      </section>

      <section className="h-"></section>
    </>
  );
};

export default Blogs;
