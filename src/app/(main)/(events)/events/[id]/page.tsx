"use client";

import { getEvent } from "@/lib/queries";
import { EventDescription } from "@/lib/types";

import React from "react";

import { BreadCrumb, Event } from ".";

type Props = {
  params: { id: number };
};

const Page = ({ params }: Props) => {
  const [event, setEvent] = React.useState<EventDescription>();

  React.useEffect(() => {
    const fetchEventDescription = async () => {
      const event = await getEvent(Number(params.id));
      setEvent(Object(event));
    };

    fetchEventDescription();
  }, [params.id]);

  if (!event) {
    return <div>No event provided</div>;
  }

  return (
    <section className="flex flex-col items-center sm:justify-center sm:h-auto w-full pt-11 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <BreadCrumb />
      <h1 className="font-bold sm:text-4xl text-2xl my-5 sm:mb-11">EVENT</h1>
      <Event event={event} />
      <div className="flex flex-col items-center">
        <h3 className="font-bold text-xl sm:mb-6 mt-4">Location</h3>
        <div>{event?.location}</div>
      </div>
      <div className="w-full flex flex-col items-center justify-center sm:m-6 p-4 mb-5">
        <h3 className="font-bold text-xl sm:mb-6">Description</h3>
        <p className="sm:w-1/2 text-center">
          {event?.description.eventDescription ? (
            event.description.eventDescription
          ) : (
            <h1>Loading...</h1>
          )}
        </p>
      </div>
    </section>
  );
};
export default Page;
