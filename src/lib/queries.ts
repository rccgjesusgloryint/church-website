"use server";

import { PrismaClient, User } from "@prisma/client";
import { CreateMediaType, GalleryType } from "./types";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export const allUsers = async () => {
  const res = await prisma.user.findMany({});
  return res;
};

export const getAuthUserDetails = async (): Promise<User | null> => {
  const user = await currentUser();
  console.log("USER: ", user);
  console.log("USER ID: ", user?.id);
  if (!user) {
    return null;
  }

  const userData = await prisma.user.findUnique({
    where: {
      externalId: user.id,
    },
  });

  console.log("USER DATA: ", userData);

  return userData;
};

export const createMedia = async (
  externalId: string,
  mediaFile: CreateMediaType
) => {
  const response = await prisma.media.create({
    data: {
      link: mediaFile.link,
      name: mediaFile.name,
      externalId: externalId,
    },
  });

  return response;
};

export const deleteMedia = async (mediaId: string) => {
  const response = await prisma.media.delete({
    where: {
      id: mediaId,
    },
  });
  return response;
};

export const getAllImages = async () => {
  const res = await prisma.media.findMany({
    select: {
      link: true,
    },
  });

  // Map through the response to get the image links and filter out empty strings
  const images = res.map((image) => image.link).filter((link) => link !== "");

  return images;
};
