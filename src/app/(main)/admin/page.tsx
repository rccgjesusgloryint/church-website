"use client";

import React from "react";
import MediaPage from "../../../../components/media";
import CreateEvent from "../../../../components/events";
import CreateSermonForm from "../../../../components/sermons/create-sermon-form";
import Navbar2 from "../../../../components/navbar/Navbar2";
import { EventTrack } from "@/lib/types";
import BlogCreator from "../../../../components/blogs/BlogCreator";
import { getAuthUserDetails } from "@/lib/queries";
import { User } from "@prisma/client";

const AdminPage = () => {
  const [eventData, setEventData] = React.useState<EventTrack[]>([]);
  const [user, setUser] = React.useState<string>();

  React.useEffect(() => {
    // getUserDetailsFunction
    const getInfo = async () => {
      const response = (await getAuthUserDetails()) as User;
      setUser(response.id);
    };
    getInfo();
  }, []);

  return (
    <section className="w-full h-full px-10">
      <Navbar2 />
      <h1 className="flex items-center justify-center text-xl mt-8">
        Admin Page
      </h1>
      <MediaPage />
      <CreateEvent />
      <section className="h-auto bg-zinc-700 p-5">
        <h1>Create Sermon Form</h1>
        <CreateSermonForm />
      </section>
      <section>
        {/* <BlogCreator user={userDetails} /> */}
        <BlogCreator userId={user} />
      </section>
    </section>
  );
};

export default AdminPage;
