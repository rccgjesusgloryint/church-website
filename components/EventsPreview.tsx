import Link from "next/link";
import React from "react";
import { FaRegMap } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";

const EventsPreview = () => {
  const month = "november";

  const eventCards = [
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
    {
      heading: "Suicide Loss Grief Support Group",
      date: ["April 28, 2022", "January 2, 2023"],
      location: "233 Main St New York, NY United States",
    },
  ];

  return (
    <section className="h-auto sm:h-screen 2xl:h-[90vh] bg-white flex items-center overflow-hidden">
      <div className="bg-gray-400 bg-opacity-70 w-screen h-full flex flex-col sm:flex-row sm:h-full sm:pt-[102px] sm:pb-[130px] relative">
        <div className="sm:w-1/3 flex flex-row sm:flex-col items-center justify-center sm:pt-[78px] pt-5 sm:pl-[179px] mb-[50px]">
          <div className="sm:pr-[20px] sm:h-[492px]">
            <div className="sm:text-left sm:block flex flex-col items-center">
              <h3 className="tracking-widest mb-1 text-light-gr">
                THIS {month.toUpperCase()}
              </h3>
              <div className="bg-dark-gr opacity-50 h-[2px] w-[9rem]"></div>
            </div>
            <h1 className="font-bold sm:text-4xl text-3xl sm:text-left text-center pt-[30px] mb-[30px] sm:w-[300px]">
              Become a part of something great
            </h1>
            <p className="text-base sm:text-left text-center sm:w-72 leading-6 mb-[20px] sm:px-0 px-6">
              We enjoy being a multi-denominational church where we work
              together, worship together, and grow together.
            </p>
            <div>
              <Link href={"/events"}>
                <h3 className="font-bold text-sm tracking-wider sm:text-left text-center hover:opacity-55 cursor-pointer transition ease-in-out">
                  + VIEW ALL EVENTS
                </h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="sm:w-2/3 px-5 flex flex-col sm:flex-row items-center justify-center  sm:items-end 2xl:items-start 2xl:pt-[75px] sm:pt-[100px] sm:pl-0 sm:gap-[18px] gap-[40px] sm:pb-[75px] pt-[50px] h-full">
          {eventCards.map((event, index) => {
            return (
              <div
                className="sm:w-[290px] 2xl:w-[390px] h-[420px] bg-white px-[30px] pt-[74px] pb-[40px] text-left relative shadow-xl"
                key={index}
              >
                <div className="absolute bg-light-gr flex flex-wrap justify-center items-center content-center top-[-45px] rounded-[50%] w-[90px] h-[90px] pt-[8px] text-white drop-shadow-custom">
                  <p className="text-[28px] text-center w-full mb-[3px] leading-6">
                    11
                  </p>
                  <p className="text-base mb-[10px]">
                    {event.date[0].length > 3
                      ? event.date[0].slice(0, 3)
                      : event.date[0]}
                  </p>
                </div>

                <h2 className="font-bold text-2xl w-[230px] 2xl:w-[337px] mb-[20px]">
                  {event.heading}
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
                <div className="border-2 border-light-gr mt-[56px] w-[160px] h-[60px] flex justify-center items-center hover:bg-light-gr hover:text-white cursor-pointer transition ease-in-out">
                  <h3 className="font-bold text-sm tracking-wider">
                    READ MORE
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="hidden absolute bottom-20 right-[450px] 3xl:flex gap-1.5">
          <div className="bg-black w-[15px] h-[15px] rounded-[50%] cursor-pointer"></div>
          <div className="bg-gray-500 w-[15px] h-[15px] rounded-[50%] cursor-pointer"></div>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
