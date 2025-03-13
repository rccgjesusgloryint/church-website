import React, { Dispatch, SetStateAction } from "react";

import { getAllEvents, getAllSermons } from "@/lib/queries";
import { EventType, Sermon } from "@/lib/types";

import EditEvent from "./components/EditEvent";
import EditSermon from "./components/EditSermon";

type Props = {
  handleSermonEdit: (id: number) => Promise<void>;
  handleEventEdit: (id: number) => Promise<void>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const EditPage = ({
  handleEventEdit,
  handleSermonEdit,
  refresh,
  setRefresh,
}: Props) => {
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
      <EditEvent
        events={events!!}
        handleEventEdit={handleEventEdit}
        setRefresh={setRefresh}
      />
      <EditSermon
        handleSermonEdit={handleSermonEdit}
        sermons={sermons as Sermon[]}
        setRefresh={setRefresh}
      />
    </section>
  );
};

export default EditPage;
