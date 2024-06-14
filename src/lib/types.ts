import { Prisma } from "@prisma/client";

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

type eventDescription = {
  eventPosterImage: string;
  eventDescription: string;
};

export type CreateEventType = {
  id?: number;
  event: string;
  date: string[];
  location: string;
  description: eventDescription;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type GalleryType = string[];

export type EventType = {
  id?: number;
  event: string;
  date: string[];
  location: string;
  description?: object;
}[];

export type EventDetail = {
  eventId?: number;
  eventPosterImages: string;
  eventDescription: string;
};
