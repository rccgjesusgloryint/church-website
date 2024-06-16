"use client";

import { getEvent } from "@/lib/queries";
import { EventDescription } from "@/lib/types";
import Image from "next/image";
import React from "react";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  const [event, setEvent] = React.useState<EventDescription>();

  React.useEffect(() => {
    const fetchEventDescription = async () => {
      const event = await getEvent(params.id);
      setEvent(Object(event));
    };

    fetchEventDescription();
  }, [params.id]);

  React.useEffect(() => {
    console.log("EVENTS: ", event);
  }, [event]);

  return (
    <div>
      <div>
        {event?.description.eventPosterImage ? (
          <Image
            src={event.description.eventPosterImage}
            alt="poster-image"
            width={500}
            height={500}
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="">
        {event?.description.eventDescription ? (
          event.description.eventDescription
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
