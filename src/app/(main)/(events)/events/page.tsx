"use client";

import React from "react";

import Navbar2 from "../../../../../components/Navbar2";

import { LuClock3 } from "react-icons/lu";
import { FaRegMap } from "react-icons/fa6";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Newsletter from "../../../../../components/Newsletter";
import { getAllEvents, getAuthUserDetails } from "@/lib/queries";
import CreateEvent from "../../../../../components/events";
import { EventType } from "@/lib/types";
import Loader from "../../../../../components/Loader";
import { redirect, useRouter } from "next/navigation";

const Events = () => {
  const useTitle = React.useRef<HTMLElement | any>();
  const useSubTitle1 = React.useRef<HTMLElement | any>();
  const useSubTitle2 = React.useRef<HTMLElement | any>();
  const useTitle2 = React.useRef<HTMLElement | any>();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(useTitle.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
    gsap.from(useSubTitle1.current, {
      scrollTrigger: useSubTitle1.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(useSubTitle2.current, {
      scrollTrigger: useSubTitle2.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(useTitle2.current, {
      scrollTrigger: useTitle2.current,
      x: 300,
      duration: 1,
      opacity: 0,
    });
  });
  const [user, setUser] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [events, setEvents] = React.useState<EventType>([]);

  const router = useRouter();

  const handleNavigation = (id: string) => {
    router.push(`/events/${id}`);
  };

  const getAuth = async () => {
    const user = await getAuthUserDetails();
    if (!user) {
      return null;
    } else {
      setUser(user?.role);
    }
  };

  React.useEffect(() => {
    getAuth();
  }, [user]);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchEvents = async () => {
      const response = await getAllEvents();
      setEvents(Object(response));
      setIsLoading(false);
    };
    fetchEvents();
  }, []); // Empty dependency array ensures this runs only once

  React.useEffect(() => {
    console.log("EVENTS: ", events);
  }, [events]);

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
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center w-full mt-11">
            <div
              className="flex flex-col items-start justify-end"
              ref={useSubTitle1}
            >
              <h3 className="tracking-widest">UPCOMING EVENTS</h3>
              <div className="bg-black opacity-55 w-[163px] h-[1px] mt-1 mb-0"></div>
            </div>
            <div
              className="flex flex-row items-center justify-center w-full relative mt-11"
              ref={useTitle2}
            >
              <h1 className="font-bold sm:text-[40px] text-[30px] w-1/2 text-center">
                Don&apos;t Miss Your Chance to Get Closer to God
              </h1>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center my-32">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap w-full items-center justify-center gap-11 gap-y-[80px] mt-[80px] mb-11 p-3">
            {events.length > 0 ? (
              events?.map((event, index) => {
                return (
                  <div
                    className="sm:w-[290px] w-[390px] 2xl:w-[390px] h-[420px] bg-white px-[30px] pt-[74px] pb-[40px] text-left relative sm:shadow-xl shadow-2xl"
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

                    <h2 className="font-bold text-2xl w-[230px] 2xl:w-[337px] mb-[20px]">
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
                          {event.location}
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
      </section>
      {user === "ADMIN" ? <CreateEvent /> : ""}
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Events;
