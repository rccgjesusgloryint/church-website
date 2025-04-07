import React, { Dispatch, SetStateAction } from "react";

import { getAllBlogs, getAllEvents, getAllSermons } from "@/lib/queries";
import { BlogType, EventType, Sermon } from "@/lib/types";

import EditEvent from "./components/EditEvent";
import EditSermon from "./components/EditSermon";
import EditBlog from "./components/EditBlog";

type Props = {
  handleSermonEdit: (id: number) => Promise<void>;
  handleEventEdit: (id: number) => Promise<void>;
  handleBlogEdit: (id: string) => Promise<void>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const EditPage = ({
  handleEventEdit,
  handleSermonEdit,
  handleBlogEdit,
  refresh,
  setRefresh,
}: Props) => {
  const [events, setEvents] = React.useState<EventType>();
  const [sermons, setSermons] = React.useState<Sermon[]>();
  const [blogs, setBlogs] = React.useState<BlogType[]>();

  React.useEffect(() => {
    const getData = async () => {
      const eventsFromDb = await getAllEvents();
      setEvents(eventsFromDb);
      const sermonsFromDb = await getAllSermons();
      setSermons(sermonsFromDb);
      const blogsFromDb = await getAllBlogs();
      setBlogs(blogsFromDb);
    };
    getData();
  }, [refresh]);

  return (
    <section className="min-h-[500px]">
      <EditEvent
        events={events!!}
        handleEventEdit={handleEventEdit}
        setRefresh={setRefresh}
      />
      <EditSermon
        handleSermonEdit={handleSermonEdit}
        sermons={sermons as Sermon[]}
        setRefresh={setRefresh}
      />
      <EditBlog
        handleBlogEdit={handleBlogEdit}
        blogs={blogs as BlogType[]}
        setRefresh={setRefresh}
      />
    </section>
  );
};

export default EditPage;
