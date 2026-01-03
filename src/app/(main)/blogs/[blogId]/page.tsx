"use client";

import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Blog } from "@prisma/client";
import { findUser, getBlogWithId } from "@/lib/queries";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization
import Navbar from "@/components/navbar/Navbar";

type BlogProps = {
  params: {
    blogId: string;
  };
};

const Blogs = ({ params }: BlogProps) => {
  const [blog, setBlog] = React.useState<
    (Blog & { updatedBy?: { name: string | null } | null }) | null
  >(null);
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

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar />
        <div className="h-full flex justify-center" ref={useTitle}>
          <div className="flex flex-col items-center justify-center text-white">
            <span className="bg-primary/50 w-auto h-auto rounded flex items-center justify-center p-3 text-center">
              {blog?.category}
            </span>
            <h1 className="font-bold text-[25px] m-5">{blog?.blogTitle}</h1>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[1rem] font-medium">
                {blog?.createdAt.toDateString().slice(3)}
              </span>
              <span className="text-[1rem] font-medium">by {author}</span>
              {blog?.updatedBy?.name && (
                <span className="text-[0.8rem] font-light italic mt-1">
                  Last updated by {blog.updatedBy.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="h-auto flex items-center justify-center py-20 px-4 sm:px-6 md:px-12">
        <div
          className="blog-content w-full max-w-[1000px] text-base sm:text-lg md:text-xl font-normal break-words overflow-wrap"
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
