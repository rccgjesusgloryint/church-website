import React from "react";

type BlogProps = {
  params: {
    blogId: string;
  };
};
// TO DO: use the blog id from the params to fetch the blog details

const Blog = ({ params }: BlogProps) => {
  return <div>{params.blogId}</div>;
};

export default Blog;
