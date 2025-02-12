"use server";

import {
  BlogType,
  CreateEventType,
  CreateSermon,
  EventTrack,
  NewletterEmail,
  Sermon,
  UploadMultipleFiles,
} from "./types";

import { Resend } from "resend";
import { auth } from "@/auth";
import prisma from "./db";
import { title } from "process";
import { Blog, Role } from "@prisma/client";

export const allUsers = async () => {
  const res = await prisma.user.findMany({});
  return res;
};

export const findUser = async (userId: string): Promise<string | false> => {
  const res = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
    },
  });
  if (!res?.name) return false;
  return res.name as string;
};

export const isAdmin = async () => {
  const session = await auth();
  if (!session) {
    return false;
  }
  const res = await prisma.user.findUnique({
    where: { id: session.user?.id },
  });

  if (res?.member === "ADMIN") {
    return true;
  } else {
    return false;
  }
};

export const accessCheck = async (): Promise<Role | undefined> => {
  const session = await auth();
  if (!session) {
    return undefined;
  }
  const res = await prisma.user.findUnique({
    where: { id: session.user?.id },
  });

  return res?.member;
};

export const getAuthUserDetails = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
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
        // ("RESPONSE: ", response);
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
  const response = await prisma.events?.findMany({
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

export const getEvent = async (id: number) => {
  const response = await prisma.events.findUnique({
    where: { id: id },
    select: {
      description: true,
      location: true,
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
  const resend = new Resend(process.env.LOCAL_RESEND_API_KEY);
  try {
    resend.emails.send({
      from: "Jesus Glory Athy <onboarding@resend.dev>",
      to: email,
      subject: "Hello World",
      text: "Welcome! Thank you for joining the Jesus Glory Athy Newletter!",
      headers: {
        "List-Unsubscribe": "<https://example.com/unsubscribe>",
      },
    });
    await fetch("https://projectplannerai.com/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "User joined newsletter", // any custom event you want to track
        projectId: "j5791dfb8vwbk25j4c7t3adrjx6wa790",
      }),
    });
    console.log("SUCCESS SENDINB EMAIL 🟢🟢");
    return { message: "SUCCESS SENDINB EMAIL 🟢🟢", status: 200 };
  } catch (error) {
    return {
      message: `OOPS, PROBLEM SENDING EMAIL 🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 400,
    };
  }
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
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const createSermon = async (sermon: CreateSermon, tags: string[]) => {
  try {
    await prisma.sermon.create({
      data: {
        videoUrl: sermon.videoUrl,
        sermonTitle: sermon.sermonTitle,
        tags: [...tags],
      },
    });
    console.log("SUCCESS CREATING SERMON 🟢🟢");
    return { message: "🟢🟢SUCCESS", status: 200 };
  } catch (error) {
    console.log("🔴🔴 OOPS COULDNT CREATE SERMON -- ", error);
    return {
      message: `🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 400,
    };
  }
};

export const getAllSermons = async (): Promise<Sermon[]> => {
  const response = await prisma.sermon.findMany({});
  return response as Sermon[];
};

export const getExistingTags = async (): Promise<string[]> => {
  try {
    const response = await prisma.sermon.findMany({
      select: {
        tags: true,
      },
    });

    // Flatten the array of arrays and remove duplicates
    const tagsList = response.flatMap((sermon) => sermon.tags);
    const uniqueTags = new Set(tagsList);
    const uniquesTagsLost = Array.from(uniqueTags);

    return uniquesTagsLost;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};

export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await prisma.blog.findMany({});

  return response as Blog[];
};

export const getBlogWithId = async (blogId: string): Promise<Blog> => {
  const response = await prisma.blog.findUnique({ where: { id: blogId } });

  return response as Blog;
};

// TO DO: refactor this to only return an array of categories
export const getBlogCategories = async (category: string): Promise<any[]> => {
  const response = await prisma.blog.findMany({
    select: { category: true },
  });

  const categories = response.filter((blog) => blog.category === category);

  return categories;
};

export const postBlog = async (blog: BlogType, userId: string | undefined) => {
  if (!userId) return false;
  try {
    await prisma.blog.create({
      data: {
        blogImage: blog.blogImage,
        blogContent: blog.blogContent,
        blogDescription: blog.blogDescription,
        blogTitle: blog.blogTitle,
        category: blog.category,
        blogAuthor: userId,
      },
    });
    console.log("BLOG POSTED 🟢🟢");
    return { message: "🟢🟢SUCCESS", status: 200 };
  } catch (error) {
    console.log("🔴🔴 OOPS COULDNT CREATE SERMON -- ", error);
    return {
      message: `🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 400,
    };
  }
};
