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

export const sendWelcomeEmail = async (email: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "Jesus Glory Athy <onboarding@jesusgloryintl.com>",
      to: email,
      subject: "Welcome to Jesus Glory Athy! 🌟",
      html: `<!DOCTYPE html>
              <html>
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <title>Welcome to Jesus Glory Athy</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          margin: 0;
                          padding: 0;
                      }
                      .container {
                          max-width: 600px;
                          margin: 20px auto;
                          background: #ffffff;
                          padding: 20px;
                          border-radius: 8px;
                          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                          text-align: center;
                      }
                      .header {
                          background: #0073e6;
                          color: #ffffff;
                          padding: 15px;
                          border-radius: 8px 8px 0 0;
                      }
                      h1 {
                          margin: 0;
                          font-size: 24px;
                      }
                      .content {
                          padding: 20px;
                          color: #333333;
                          font-size: 16px;
                          line-height: 1.6;
                      }
                      .button {
                          display: inline-block;
                          background: #0073e6;
                          color: #ffffff;
                          text-decoration: none;
                          padding: 10px 20px;
                          border-radius: 5px;
                          font-size: 16px;
                          margin-top: 15px;
                      }
                      .footer {
                          font-size: 14px;
                          color: #777777;
                          margin-top: 20px;
                          padding-top: 15px;
                          border-top: 1px solid #eeeeee;
                      }
                      a {
                          color: #0073e6;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <div class="header">
                          <h1>Welcome to Jesus Glory Athy! 🙌</h1>
                      </div>
                      <div class="content">
                          <p>Thank you for joining the <strong>Jesus Glory Athy Newsletter</strong>! We are so excited to have you as part of our community.</p>
                          <p>You’ll receive inspiring messages, event updates, and faith-filled content straight to your inbox.</p>
                          <a href="${process.env.NEXTAUTH_URL}/events" class="button">Explore Upcoming Events</a>
                          <p>We pray this journey strengthens your faith and brings blessings to your life.</p>
                      </div>
                      <div class="footer">
                           <p>Want to manage your preferences? <a href="${process.env.NEXTAUTH_URL}/unsubscribe?email=${email}">Unsubscribe here</a>.</p>
                          <p>May God bless you abundantly! ✨</p>
                      </div>
                  </div>
              </body>
              </html>
              `,
      headers: {
        "List-Unsubscribe": `<mailto:unsubscribe@jesusgloryintl.com>`,
      },
    });

    if (error) {
      return {
        message: `OOPS, PROBLEM SENDING EMAIL 🔴🔴 :${error}`,
        status: 400,
      };
    }

    try {
      await prisma.newsletterEmail.create({
        data: { email },
      });
    } catch (error) {
      return console.log(error);
    }

    return { message: "SUCCESS SENDING EMAIL 🟢🟢", status: 200 };
  } catch (error) {
    return {
      message: `OOPS, PROBLEM SENDING EMAIL 🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 400,
    };
  }
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
