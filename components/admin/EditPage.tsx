import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getAllEvents, getAllSermons } from "@/lib/queries";
import { EventType, Sermon } from "@/lib/types";

import { BiEdit } from "react-icons/bi";

type Props = {
  handleSermonEdit: (id: number) => Promise<void>;
  handleEventEdit: (id: number) => Promise<void>;
  refresh: boolean;
};

const EditPage = ({ handleEventEdit, handleSermonEdit, refresh }: Props) => {
  const [events, setEvents] = React.useState<EventType>();
  const [sermons, setSermons] = React.useState<Sermon[]>();

  React.useEffect(() => {
    const getData = async () => {
      const eventsFromDb = await getAllEvents();
      setEvents(eventsFromDb);
      const sermonsFromDb = await getAllSermons();
      setSermons(sermonsFromDb);
    };
    getData();
  }, [refresh]);

  return (
    <section className="min-h-[500px]">
      <Card className="sm:p-[10rem] min-h-[500px]">
        <CardHeader>
          <CardTitle className="font-bold">
            <CardDescription className="text-4xl">Edit Page</CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h1>Events</h1>
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
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1>Sermons</h1>
            <div className="flex flex-col items-center justify-center">
              {sermons &&
                sermons?.map((s) => (
                  <div
                    className="flex items-center justify-center gap-2"
                    key={s.id}
                  >
                    <span>{s.sermonTitle}</span>
                    <BiEdit
                      className="cursor-pointer"
                      onClick={() => handleSermonEdit(s.id!!)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default EditPage;
