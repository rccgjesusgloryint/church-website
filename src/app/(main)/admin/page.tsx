"use client";

import React from "react";
import MediaPage from "../../../../components/media";
import CreateEvent from "../../../../components/events";
import CreateSermonForm from "../../../../components/sermons/create-sermon-form";
import Navbar2 from "../../../../components/navbar/Navbar2";
import { EventTrack } from "@/lib/types";
import { getAllTrackedEvent } from "@/lib/queries";
import { CustomBarChart } from "../../../../components/charts/bar-chart";

const AdminPage = () => {
  const [eventData, setEventData] = React.useState<EventTrack[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const response = await getAllTrackedEvent();
      setEventData(response);
    };
    getData();
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
      {/* <section className="h-screen">
        <h1>Statistic Page</h1>
        <CustomBarChart
          eventData={eventData}
          primaryKey="event_type"
          dataKey2="event_calls"
        />
      </section> */}
    </section>
  );
};

export default AdminPage;
