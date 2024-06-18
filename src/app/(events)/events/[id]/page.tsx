"use client";

import { getEvent } from "@/lib/queries";
import { EventDescription } from "@/lib/types";
import { useModal } from "@/providers/modal-provider";
import Image from "next/image";
import React from "react";
import CustomModal from "../../../../../components/global/custom-modal";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  const [event, setEvent] = React.useState<EventDescription>();

  const { setOpen } = useModal();

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
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <section className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="font-bold text-4xl mb-11">EVENT</h1>
        <div>
          {event?.description.eventPosterImage ? (
            <Image
              src={event.description.eventPosterImage}
              alt="poster-image"
              width={500}
              height={500}
              onClick={() =>
                setOpen(
                  <CustomModal title="" subheading="">
                    <Image
                      src={event.description.eventPosterImage}
                      alt="poster-image"
                      width={1000}
                      height={1500}
                    />
                  </CustomModal>
                )
              }
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-11">
          <h3 className="font-bold text-xl mb-11">Description</h3>
          <p className="w-1/2 text-center">
            {event?.description.eventDescription ? (
              event.description.eventDescription
            ) : (
              <h1>Loading...</h1>
            )}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Page;
