import { Prisma } from "@prisma/client";

export type UserDetails = {
  name: string | null | undefined;
  email: string;
};

export type CreateMediaType = Prisma.MediaCreateInput;

export type GalleryType = string[];
