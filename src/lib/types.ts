import { Prisma } from "@prisma/client";

export type UserDetails = {
  name: string | null | undefined;
  email: string;
};

type User = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string; // Add this line
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

export type GalleryType = string[];
