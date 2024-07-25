import React from "react";
import EventsForm from "./events-form";

const CreateEvent = () => {
  return (
    <section className="h-auto bg-gray-500 p-5">
      <h1 className="font-bold text-lg">Create Events Form</h1>
      <EventsForm />
    </section>
  );
};

export default CreateEvent;
