import React, { Dispatch, SetStateAction } from "react";

import {
  getAllBlogs,
  getAllEvents,
  getAuthUserDetails,
  isAdmin,
} from "@/lib/queries";
import { BlogType, EventType } from "@/lib/types";

import EditEvent from "./components/EditEvent";
import EditBlog from "./components/EditBlog";
import { User } from "@prisma/client";

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
  const [events, setEvents] = React.useState<EventType>();
  const [allBlogs, setAllBlogs] = React.useState<BlogType[]>();
  const [usersBlogs, setUsersBlogs] = React.useState<BlogType[]>();
  const [currentUser, setCurrentUser] = React.useState<User>();

  React.useEffect(() => {
    const getData = async () => {
      const eventsFromDb = await getAllEvents();
      setEvents(eventsFromDb);
      const blogsFromDb = await getAllBlogs();
      setAllBlogs(blogsFromDb);
      const currUser = await getAuthUserDetails();
      setCurrentUser(currUser as User);
    };
    const filteredBlogs = allBlogs?.filter(
      (blog) => blog.id === currentUser?.id
    );
    setUsersBlogs(filteredBlogs);

    getData();
  }, [refresh]);

  return (
    <section className="min-h-[500px]">
      <EditEvent
        events={events!!}
        handleEventEdit={handleEventEdit}
        setRefresh={setRefresh}
      />

      <EditBlog
        handleBlogEdit={handleBlogEdit}
        blogs={
          currentUser?.member === "ADMIN"
            ? (allBlogs as BlogType[])
            : usersBlogs!!
        }
        setRefresh={setRefresh}
      />
    </section>
  );
};

export default EditPage;
