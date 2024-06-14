"use server";

import { PrismaClient } from "@prisma/client";
import { CreateEventType, CreateMediaType, GalleryType } from "./types";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const allUsers = async () => {
  const res = await prisma.user.findMany({});
  return res;
};

export const getAuthUserDetails = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userData = await prisma.user.findUnique({
    where: {
      externalId: user.id,
    },
  });

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

export const createEvent = async (eventObj: CreateEventType) => {
  try {
    await prisma.events.create({
      data: {
        event: eventObj.event,
        date: eventObj.date,
        location: eventObj.location,
      },
    });

    console.log("SUCCESS CREATING EVENT 🟢🟢");
    return { status: 200 };
  } catch (error) {
    console.log("OOPS, PROBLEM CREATING EVENT 🔴🔴");
    return { status: 400 };
  }
};

export const getAllEvents = async () => {
  const response = await prisma.events.findMany({
    select: {
      id: true,
      event: true,
      date: true,
      location: true,
    },
  });

  return response;
};
