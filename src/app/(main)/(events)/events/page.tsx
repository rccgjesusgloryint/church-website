"use client";

import React from "react";

import Navbar2 from "../../../../../components/navbar/Navbar2";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { getAllEvents } from "@/lib/queries";
import { EventType } from "@/lib/types";

import { EventCards, EventHeadings } from ".";

const Events = () => {
  const useTitle = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(useTitle.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [events, setEvents] = React.useState<EventType>([]);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchEvents = async () => {
      const response = await getAllEvents();
      setEvents(Object(response));
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <>
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar2 />
        <div className="h-full flex justify-center" ref={useTitle}>
          <div className="flex items-center justify-center">
            <h1 className="text-white font-bold sm:text-[80px] text-[35px]">
              Our Events
            </h1>
          </div>
        </div>
      </section>
      <section className="h-auto w-full relative">
        <EventHeadings />
        <EventCards isLoading={isLoading} events={events} />
      </section>
    </>
  );
};

export default Events;
