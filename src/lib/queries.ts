"use server";

import { PrismaClient } from "@prisma/client";
import {
  CreateEventType,
  CreateMediaType,
  GetAllImages,
  NewletterEmail,
  UploadMultipleFiles,
} from "./types";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { Resend } from "resend";

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
  name: string,
  mediaFile: UploadMultipleFiles
) => {
  try {
    mediaFile.map(async (link) => {
      try {
        const response = await prisma.media.create({
          data: {
            link: link.url,
            name: name,
            // externalId: externalId,
          },
        });
        // console.log("RESPONSE: ", response);
      } catch (error) {
        console.log("ERROR: ", error);
        return { message: "OOPS COULDNT UPLAOD FILES", status: 400 };
      }
    });
    return { message: "SUCCESSFULLY UPLAODED FILES", status: 200 };
  } catch (error) {
    console.log("ERROR: ", error);
    return { message: "OOPS COULDNT UPLAOD FILES", status: 400 };
  }
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
  const response = await prisma.media.findMany({
    select: {
      link: true,
      name: true,
    },
  });
  return response;
};

export const createEvent = async (eventObj: CreateEventType) => {
  try {
    await prisma.events.create({
      data: {
        id: eventObj.id,
        event: eventObj.event,
        date: eventObj.date,
        location: eventObj.location,
        description: eventObj.description,
      },
    });

    console.log("SUCCESS CREATING EVENT 🟢🟢");
    return { message: "SUCCESS CREATING EVENT 🟢🟢", status: 200 };
  } catch (error) {
    console.log(`OOPS, PROBLEM CREATING EVENT 🔴🔴 -- ERROR MESSAGE: ${error}`);
    return {
      message: `OOPS, PROBLEM CREATING EVENT 🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 400,
    };
  }
};

export const getAllEvents = async () => {
  const response = await prisma.events.findMany({
    select: {
      id: true,
      event: true,
      date: true,
      location: true,
      description: true,
    },
  });

  return response;
};

export const getEvent = async (id: string) => {
  const response = await prisma.events.findUnique({
    where: { id: id },
    select: {
      description: true,
    },
  });

  return response;
};

export const addEmailFromNewsletterToDB = async (email: string) => {
  try {
    await prisma.newsletter.upsert({
      where: { email },
      create: {
        email,
      },
      update: {
        email,
      },
    });

    console.log("SUCCESS ADDING EMAIL TO DB 🟢🟢");
    return { message: "SUCCESS ADDING EMAIL TO DB 🟢🟢", status: 200 };
  } catch (error) {
    console.log(
      `OOPS, PROBLEM ADDING EMAIL TO DB 🔴🔴 -- ERROR MESSAGE: ${error}`
    );
    return {
      message: `OOPS, PROBLEM ADDING EMAIL TO DB 🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 400,
    };
  }
};

export const sendWelcomeEmail = async (email: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: "Jesus Glory Athy <onboarding@resend.dev>",
    to: email,
    subject: "Hello World",
    text: "Welcome! Thank you for joining the Jesus Glory Athy Newletter!",
    headers: {
      "List-Unsubscribe": "<https://example.com/unsubscribe>",
    },
  });
};

export const getNewsletterUsers = async () => {
  const response = prisma.newsletter.findMany({
    select: {
      email: true,
    },
  });

  return response;
};

export const sendBulkNewsletterEmail = async (
  newsletterEmails: NewletterEmail
) => {
  const resend = new Resend(process.env.PROD_RESEND_API_KEY);

  if (!newsletterEmails) {
    return null;
  }

  try {
    const response = await resend.batch.send(
      newsletterEmails.map((email) => {
        return {
          from: "Jesus Glory Athy Newsletter <onboarding@resend.dev>",
          to: [email.email],
          subject: "TEST",
          html: "<h1>it works!</h1>",
        };
      })
    );

    console.log("RES: ", response);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
