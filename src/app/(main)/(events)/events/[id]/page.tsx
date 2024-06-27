"use client";

import { getEvent } from "@/lib/queries";
import { EventDescription } from "@/lib/types";
import { useModal } from "@/providers/modal-provider";

import Image from "next/image";

import React from "react";

import CustomModal from "../../../../../../components/global/custom-modal";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  params: { id: number };
};

const Page = ({ params }: Props) => {
  const [event, setEvent] = React.useState<EventDescription>();

  const { setOpen } = useModal();

  React.useEffect(() => {
    const fetchEventDescription = async () => {
      const event = await getEvent(Number(params.id));
      setEvent(Object(event));
    };

    fetchEventDescription();
  }, [params.id]);

  return (
    <section className="flex flex-col items-center sm:justify-center h-screen w-full pt-11 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/events">Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Event</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-bold sm:text-4xl text-2xl my-5 sm:mb-11">EVENT</h1>
      <div>
        {event?.description.eventPosterImage ? (
          <div>
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
              className={"hidden sm:flex"}
            />
            <Image
              src={event.description.eventPosterImage}
              alt="poster-image"
              width={300}
              height={300}
              className={"flex sm:hidden"}
            />
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
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
