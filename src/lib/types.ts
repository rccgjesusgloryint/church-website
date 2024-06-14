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

export type CreateEventType = {
  id?: string;
  event: string;
  date: string[];
  location: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type GalleryType = string[];
export type EventType = {
  id?: number;
  event: string;
  date: string[];
  location: string;
}[];
