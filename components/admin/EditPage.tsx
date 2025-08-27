import React, { Dispatch, SetStateAction } from "react";

import { BlogType } from "@/lib/types";

import EditEvent from "./components/EditEvent";
import EditBlog from "./components/EditBlog";

import { useEditPageData } from "@/hooks/useEditPageData";

type Props = {
  handleEventEdit: (id: number) => Promise<void>;
  handleBlogEdit: (id: string) => Promise<void>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const EditPage = ({
  handleEventEdit,
  handleBlogEdit,
  refresh,
  setRefresh,
}: Props) => {
  const { allBlogs, currentUser, error, events, loading, usersBlogs } =
    useEditPageData(refresh);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[500px] flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  const blogsToShow = currentUser?.member === "ADMIN" ? allBlogs : usersBlogs;

  return (
    <section className="min-h-[500px]">
      <EditEvent
        events={events!!}
        handleEventEdit={handleEventEdit}
        setRefresh={setRefresh}
      />

      <EditBlog
        handleBlogEdit={handleBlogEdit}
        blogs={blogsToShow as BlogType[]}
        setRefresh={setRefresh}
      />
    </section>
  );
};

export default EditPage;
