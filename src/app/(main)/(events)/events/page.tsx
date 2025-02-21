"use client";

import React from "react";

import Navbar2 from "../../../../../components/navbar/Navbar2";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { getAllEvents } from "@/lib/queries";
import { EventType } from "@/lib/types";

import { UpcomingEventCards } from "./UpcomingEvents";
import { PastEvents } from "./PastEvents";

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
  const [upcomingEvents, setUpcomingEvents] = React.useState<EventType>([]);
  const [pastEvents, setPastEvents] = React.useState<EventType>([]);

  const today = new Date(Date.now());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[today.getMonth()];

  React.useEffect(() => {
    setIsLoading(true);
    const fetchEvents = async () => {
      const response = await getAllEvents();
      const upcomingEventsList = response
        .filter((e) => {
          if (e.date.length > 0) {
            const eventDate = new Date(e.date[0]);
            return eventDate >= today;
          }
          return false;
        })
        .sort(
          (a, b) =>
            new Date(a.date[0]).getTime() - new Date(b.date[0]).getTime()
        );
      const pastEventsList = response.filter((e) => {
        if (e.date.length > 0) {
          const eventDate = new Date(e.date[0]);
          return eventDate < today;
        }
        return false;
      });
      setUpcomingEvents(Object(upcomingEventsList));
      setPastEvents(Object(pastEventsList));
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
      <section className="h-screen w-full relative">
        <UpcomingEventCards isLoading={isLoading} events={upcomingEvents} />
      </section>
      <section className="h-auto w-full relative">
        <PastEvents pastEvents={pastEvents} isLoading={isLoading} />
      </section>
    </>
  );
};

export default Events;
