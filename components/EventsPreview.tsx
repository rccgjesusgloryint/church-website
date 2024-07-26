"use client";

import { getAllEvents } from "@/lib/queries";
import { EventType } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegMap } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import Loader from "./Loader";
import { trackEventCall } from "@/lib/actions";

const EventsPreview = () => {
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

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [events, setEvents] = React.useState<EventType>([]);
  const router = useRouter();
  const handleNavigation = (id: number) => {
    router.push(`/events/${id}`);
  };
  React.useEffect(() => {
    setIsLoading(true);
    const fetchEvents = async () => {
      const response = await getAllEvents();
      const event = response.length > 3 && response.slice(0, 3);
      setEvents(Object(response));
      setIsLoading(false);
    };
    fetchEvents();
    console.log("months: ", month);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <section className="h-auto flex items-center overflow-hidden w-screen">
      <div className="bg-gray-400 bg-opacity-70 w-full h-full flex xl:flex-nowrap flex-wrap items-center justify-center px-5">
        <div className="h-full w-auto xl:pl-[50px] xl:pt-0 pt-5">
          <div className="sm:text-left sm:block flex flex-col items-center">
            <h3 className="tracking-widest mb-1 text-light-gr text-left">
              THIS {month.toUpperCase()}
            </h3>
            <div className="bg-dark-gr opacity-50 h-[2px] w-1/2"></div>
          </div>
          <h1 className="font-bold sm:text-4xl text-3xl sm:text-left text-center pt-[30px] mb-[30px] sm:w-[300px]">
            Become a part of something great
          </h1>
          <p className="text-base sm:text-left text-center sm:w-72 leading-6 mb-[20px] sm:px-0 px-6">
            We enjoy being a multi-denominational church where we work together,
            worship together, and grow together.
          </p>
          <div>
            <Link
              href={"/events"}
              onClick={() => trackEventCall("View All Events Button")}
            >
              <h3 className="font-bold text-sm tracking-wider sm:text-left text-center hover:opacity-55 cursor-pointer transition ease-in-out">
                + VIEW ALL EVENTS
              </h3>
            </Link>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center my-32">
            <Loader />
          </div>
        ) : (
          <div className="flex lg:flex-nowrap flex-wrap xl:h-screen xl:mt-0 mt-16 w-full items-center justify-center gap-8">
            {events.length > 0 ? (
              events?.slice(0, 3).map((event, index) => {
                return (
                  <div
                    className={`w-[300px] min-h-[420px] h-auto bg-white px-[30px] pt-[74px] pb-[40px] text-left relative shadow-xl xl:mb-0 mb-10 lg:block ${
                      index === 2 ? "hidden" : ""
                    }`}
                    key={index}
                  >
                    <div className="absolute bg-light-gr flex flex-wrap justify-center items-center content-center top-[-45px] rounded-[50%] w-[90px] h-[90px] pt-[8px] text-white drop-shadow-custom">
                      <p className="text-[28px] text-center w-full mb-[3px] leading-6">
                        {event.date[0].split(" ")[1].length > 2
                          ? event.date[0].split(" ")[1].slice(0, 2)
                          : event.date[0].split(" ")[1].slice(0, 1)}
                      </p>
                      <p className="text-base mb-[10px]">
                        {event.date[0].length > 3
                          ? event.date[0].slice(0, 3)
                          : event.date[0]}
                      </p>
                    </div>

                    <h2 className="font-bold text-2xl w-[230px] mb-[20px]">
                      {event?.event}
                    </h2>
                    <div className="relative">
                      <div className="flex flex-col absolute w-[112px]">
                        <span className="mt-1">
                          <LuClock3 />
                        </span>
                        <span className=""></span>
                      </div>
                      <div className="font-bold text-base pl-10">
                        <div>
                          <p>{event.date[0]}</p>
                        </div>
                        <div>
                          <p>{event.date[1]}</p>
                        </div>
                      </div>
                      <div className="pt-[20px]">
                        <span className="absolute mt-[5px]">
                          <FaRegMap />
                        </span>
                        <p className="font-bold text-base pl-10">
                          {event.location.length > 25
                            ? // events[1].location.split(" ").slice(0, 3)
                              event.location.slice(0, 25) + "..."
                            : event.location}
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-2 border-light-gr mt-[56px] w-[160px] h-[60px] flex justify-center items-center hover:bg-light-gr hover:text-white cursor-pointer transition ease-in-out"
                      onClick={() => handleNavigation(event.id)}
                    >
                      <h3 className="font-bold text-sm tracking-wider">
                        READ MORE
                      </h3>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h1>No events yet!</h1>
              </div>
            )}
          </div>
        )}
        <div className="hidden absolute bottom-20 right-[450px] 3xl:flex gap-1.5">
          <div className="bg-black w-[15px] h-[15px] rounded-[50%] cursor-pointer"></div>
          <div className="bg-gray-500 w-[15px] h-[15px] rounded-[50%] cursor-pointer"></div>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
