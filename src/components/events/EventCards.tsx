import React from "react";

import Loader from "../Loader";

import { EventType } from "@/lib/types";
import Cards from "./Cards";

type EventCardProps = {
  events: EventType;
  isLoading: boolean;
};

const EventCards = ({ events, isLoading }: EventCardProps) => {
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center my-32">
          <Loader />
        </div>
      ) : (
        <div className="flex lg:flex-nowrap flex-wrap xl:h-screen xl:mt-0 mt-16 w-full items-center justify-center gap-8">
          <Cards events={events} />
        </div>
      )}
    </>
  );
};

export default EventCards;
