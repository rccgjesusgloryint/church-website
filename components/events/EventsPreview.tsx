"use client";

import { getAllEvents } from "@/lib/queries";
import { EventType } from "@/lib/types";

import React from "react";

import EventsIntro from "./EventsIntro";
import EventCards from "./EventCards";

const EventsPreview = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [events, setEvents] = React.useState<EventType>([]);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchEvents = async () => {
      const response = await getAllEvents();
      const event = response.length > 3 && response.slice(0, 3);
      setEvents(Object(response));
      setIsLoading(false);
    };
    fetchEvents();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <section className="h-auto flex items-center overflow-hidden w-screen">
      <div className="bg-gray-400 bg-opacity-70 w-full h-full flex xl:flex-nowrap flex-wrap items-center justify-center px-5">
        <EventsIntro />
        <EventCards isLoading={isLoading} events={events} />
        <div className="hidden absolute bottom-20 right-[450px] 3xl:flex gap-1.5">
          <div className="bg-black w-[15px] h-[15px] rounded-[50%] cursor-pointer"></div>
          <div className="bg-gray-500 w-[15px] h-[15px] rounded-[50%] cursor-pointer"></div>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
