import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export type UserDetails = {
  name: string | null | undefined;
  email: string;
};

export type CreateMediaType = {
  id?: string;
  type?: string | null;
  name: string;
  link: string;
  externalId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CreateEventType = {
  id: string;
  event: string;
  date: string[];
  location: string;
  description: {
    eventPosterImage: string;
    eventDescription: string;
  };
};

export type GalleryType = string[];

export type EventType = {
  id: string;
  event: string;
  date: string[];
  location: string;
  description: object | JsonValue;
}[];

export type EventDetail = {
  eventId?: string;
  eventPosterImage: string;
  eventDescription: string;
};

export type EventDescription = {
  description: {
    eventPosterImage: string;
    eventDescription: string;
  };
};
