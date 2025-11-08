import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogType } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";
import { BiEdit } from "react-icons/bi";
import DeleteItems from "./DeleteItems";
import { deleteBlog } from "@/lib/queries";

type Props = {
  blogs: BlogType[];
  setRefresh: Dispatch<SetStateAction<boolean>>;
  handleBlogEdit: (id: string) => Promise<void>;
};

const EditBlog = ({ blogs, setRefresh, handleBlogEdit }: Props) => {
  const handleBlogDelete = async (id: string) => {
    await deleteBlog(id as string);
  };
  return (
    <Card className="sm:p-[10rem] min-h-[500px]">
      <CardHeader>
        <CardTitle className="font-bold">
          <CardDescription className="text-4xl">Edit Blog</CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex flex-col items-start justify-center">
            {blogs ? (
              blogs?.map((b) => (
                <div
                  className="flex items-center justify-center gap-2"
                  key={b.id}
                >
                  <span>{b.blogTitle}</span>
                  <BiEdit
                    className="cursor-pointer"
                    onClick={() => handleBlogEdit(b.id!!)}
                  />
                  <DeleteItems
                    item={"Blog"}
                    func={handleBlogDelete}
                    id={b.id!!}
                    setRefresh={setRefresh}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-xl">You have posted no blogs yet!</h3>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditBlog;
