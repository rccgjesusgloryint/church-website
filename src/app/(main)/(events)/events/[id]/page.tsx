"use client";

import { getEvent } from "@/lib/queries";
import type { EventDescription } from "@/lib/types";
import React from "react";
import { MapPin, Users } from "lucide-react";
import { ImageCard } from ".";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Navbar from "@/components/navbar/Navbar";

type Props = {
  params: { id: number };
};

const Page = ({ params }: Props) => {
  const [event, setEvent] = React.useState<EventDescription | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchEventDescription = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const eventData = await getEvent(Number(params.id));

        if (!eventData) {
          setError("Event not found");
        } else {
          setEvent(eventData as EventDescription);
        }
      } catch (err) {
        setError("Failed to load event");
        console.error("[v0] Error fetching event:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDescription();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-muted-foreground">Loading event details...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <p className="text-destructive text-lg mb-2">
            {error || "Event not found"}
          </p>
          <p className="text-muted-foreground">
            Please check the event ID and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="space-y-12">
            {/* Image Component */}
            <div className="border-b border-border pb-12">
              <ImageCard
                image={{
                  src: event.description.eventPosterImage,
                  width: 400,
                  height: 400,
                }}
              />
            </div>

            {/* Location Section */}
            <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start border-b border-border pb-12">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent">
                <MapPin className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-foreground">
                  Location
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.location}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-foreground">
                  About This Event
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.description.eventDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
