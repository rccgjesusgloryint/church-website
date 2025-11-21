import { Badge } from "@/components/ui/badge";
import { EventsMedia } from "@/lib/types";
import { Calendar, MapPin, Images } from "lucide-react";

interface GalleryHeaderProps {
  event: EventsMedia;
}

export function GalleryHeader({ event }: GalleryHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={event.date.toISOString()}>
            {event.date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Images className="h-4 w-4" />
          <span>{event.images.length} photos</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl text-balance">
        {event.event}
      </h1>

      {event.description && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {event.description}
        </p>
      )}
    </div>
  );
}
