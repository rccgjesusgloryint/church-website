"use client";

import { useEffect, useState } from "react";
import MediaPage from "../../../../components/media";
import CreateEvent from "../../../../components/events";
import CreateSermonForm from "../../../../components/sermons/create-sermon-form";
import Navbar2 from "../../../../components/Navbar2";
import { EventTrack } from "@/lib/types";
import { getAllTrackedEvent } from "@/lib/queries";
import { CustomBarChart } from "../../../../components/charts/bar-chart";

const page = () => {
  const [eventData, setEventData] = useState<EventTrack[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getAllTrackedEvent();
      setEventData(response);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("EVENT DATA: ", eventData);
  }, [eventData]);
  return (
    <section className="w-full h-full">
      <Navbar2 />
      <h1 className="flex items-center justify-center text-xl mt-8">
        Admin Page
      </h1>
      <MediaPage />
      <CreateEvent />
      <section className="h-screen bg-red-500">
        <h1>Create Sermon Form</h1>
        <CreateSermonForm />
      </section>
      <section className="h-screen bg-red-600">
        <h1>Statistic Page</h1>
        <CustomBarChart
          eventData={eventData}
          primaryKey="event_type"
          dataKey2="event_calls"
        />
      </section>
    </section>
  );
};

export default page;
