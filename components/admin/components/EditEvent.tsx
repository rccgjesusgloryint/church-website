import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventsType, EventType } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";
import { BiEdit } from "react-icons/bi";
import DeleteItems from "./DeleteItems";
import { deleteEvent } from "@/lib/queries";

type Props = {
  events: EventType;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  handleEventEdit: (id: number) => Promise<void>;
};

const EditEvent = ({ events, setRefresh, handleEventEdit }: Props) => {
  const handleEventDelete = async (id: number) => {
    await deleteEvent(id);
  };
  return (
    <Card className="sm:p-[10rem] min-h-[500px]">
      <CardHeader>
        <CardTitle className="font-bold">
          <CardDescription className="text-4xl">Edit Event</CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h1>Events:</h1>
          <div className="flex flex-col items-center justify-center">
            {events?.map((e) => (
              <div
                className="flex items-center justify-center gap-2"
                key={e.id}
              >
                <span>{e.event}</span>
                <BiEdit
                  className="cursor-pointer"
                  onClick={() => handleEventEdit(e.id!!)}
                />

                <DeleteItems
                  item={"Event"}
                  func={handleEventDelete as any}
                  id={e.id!!}
                  setRefresh={setRefresh}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditEvent;
