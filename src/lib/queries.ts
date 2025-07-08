"use server";

import {
  BlogType,
  CarosoulImageType,
  ContactFormType,
  CreateEventType,
  CreateSermon,
  EventsType,
  NewletterEmail,
  Sermon,
  UploadMultipleFiles,
} from "./types";

import { Resend } from "resend";
import { auth } from "@/auth";
import { prisma } from "./db";

import { Blog, Media, Role } from "@prisma/client";

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

export const isUserOwner = async () => {
  const session = await auth();
  if (!session) {
    return false;
  }
  const res = await prisma.user.findUnique({
    where: { id: session.user?.id },
  })!!;

  return res?.member;
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
  // if (process.env.NODE_ENV === "test") {
  //   return {
  //     member: "ADMIN",
  //     data: {
  //       id: "test-user-id",
  //       name: "Test User",
  //       email: "test@example.com",
  //     },
  //     status: "authenticated",
  //   };
  // }

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
    for (const link of mediaFile) {
      try {
        await prisma.media.create({
          data: {
            link: link.url,
            name: name,
          },
        });

        // Small delay to prevent overwhelming DB (optional but helps on low limits)
        await new Promise((resolve) => setTimeout(resolve, 50));
      } catch (error) {
        console.error("Error creating media record:", error);
        return { message: "OOPS COULDN'T UPLOAD SOME FILES", status: 400 };
      }
    }

    return { message: "SUCCESSFULLY UPLOADED FILES", status: 200 };
  } catch (error) {
    console.error("Fatal error in createMedia:", error);
    return { message: "FATAL ERROR UPLOADING FILES", status: 500 };
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

export const getRandomImages = async (
  amount: number
): Promise<CarosoulImageType[]> => {
  const response = await prisma.media.findMany({
    select: {
      id: true,
      link: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let randomImages = response
    .filter((image, index) => {
      let randomNum = Math.random() * 15;
      if (index < randomNum) return;
      if (index % 2 == 0) return image;
    })
    .slice(0, amount);

  return randomImages;
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
        monthly: eventObj.monthly,
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
      monthly: true,
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

export const getEventById = async (id: number): Promise<EventsType | null> => {
  const response = await prisma.events.findUnique({
    where: { id: id },
  });

  return Object(response) as EventsType;
};

export const sendWelcomeEmail = async (email: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // ✅ Step 1: Check if the email already exists
    const existingEmail = await prisma.newsletterEmail.findUnique({
      where: { email },
    });

    if (existingEmail) {
      console.log(`Email already exists`);
      return { message: "This email is already subscribed.", status: 409 };
    }

    // ✅ Step 2: Send the Welcome Email
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
                          color: #777777 !important;
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
                          <a href="${process.env.BASE_URL}/events" class="button">Explore Upcoming Events</a>
                          <p>We pray this journey strengthens your faith and brings blessings to your life.</p>
                      </div>
                      <div class="footer">
                           <p>Want to manage your preferences? <a href="${process.env.BASE_URL}/unsubscribe?email=${email}">Unsubscribe here</a>.</p>
                          <p>May God bless you abundantly! ✨</p>
                      </div>
                  </div>
              </body>
              </html>`,
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

    // ✅ Step 3: Add Email to Database After Successful Email Sending
    try {
      await prisma.newsletterEmail.create({
        data: { email },
      });
    } catch (error) {
      console.error("Database Error:", error);
      return { message: "Error saving email to database", status: 500 };
    }

    return { message: "SUCCESS SENDING EMAIL 🟢🟢", status: 200 };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      message: `OOPS, PROBLEM SENDING EMAIL 🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 500,
    };
  }
};

export const addEmailToNewsletter = async (newEmail: string) => {
  const email = await prisma.newsletterEmail.findUnique({
    where: { email: newEmail },
  });

  if (email) {
    console.log("email already exists!");
    return { message: "email already exists!", status: 305 };
  }
  try {
    await prisma.newsletterEmail.create({
      data: { email: newEmail },
    });
    console.log({ message: "SUCCESS SENDING EMAIL 🟢🟢", status: 200 });
    return { message: "SUCCESS SENDING EMAIL 🟢🟢", status: 200 };
  } catch (error) {
    return console.log(error);
  }
};

export const sendContactEmail = async ({
  email,
  name,
  message,
}: ContactFormType) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: `${name} <contact@jesusgloryintl.com>`,
      to: "rccgjesusgloryint@gmail.com",
      subject: `From contact form`,
      html: `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Message from contact form</title>
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
                </style>
            </head>
            <body>
                <div class="container">
                <div>
                  <h1>${name} is contacting the church from the contact form, here's what they said...</h1>
                </div>
                    <div class="content">
                        <p>${message}</p>
                    </div>
                </div>
            </body>
            </html>`,
    });

    if (error) {
      return {
        message: `OOPS, PROBLEM SENDING EMAIL 🔴🔴 :${error}`,
        status: 400,
      };
    }
    return { message: "SUCCESS SENDING EMAIL 🟢🟢", status: 200 };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      message: `OOPS, PROBLEM SENDING EMAIL 🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 500,
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

export const deleteSermon = async (sermonId: number) => {
  try {
    await prisma.sermon.delete({
      where: { id: sermonId },
    });
    console.log({ message: "SUCCESS DELETING SERMON", status: 200 });
    return { message: "SUCCESS DELETING SERMON", status: 200 };
  } catch (error) {
    console.log("🔴🔴 OOPS COULDNT DELETE SERMON -- ", error);
    return {
      message: `🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 400,
    };
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
  //Check for new sermons in the youtube channel and add to db
  const checkYTchannel = `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube`;
  await fetch(checkYTchannel, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // grap all sermons in db
  const response = await prisma.sermon.findMany({});
  return response as Sermon[];
};

export const getSermonById = async (id: number): Promise<Sermon> => {
  const response = await prisma.sermon.findUnique({
    where: { id },
  });
  return response as Sermon;
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
export const getBlogCategories = async (): Promise<string[]> => {
  const response = await prisma.blog.findMany({
    select: { category: true },
  });

  let allCategories = [] as string[];

  response.map((blog) => allCategories.push(blog.category));

  return allCategories;
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
    console.log("🔴🔴 OOPS COULDNT POST BLOG -- ", error);
    return {
      message: `🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 400,
    };
  }
};

export const deleteBlog = async (blogId: string) => {
  try {
    await prisma.blog.delete({
      where: { id: blogId },
    });
    console.log({ message: "SUCCESS DELETING BLOG", status: 200 });
    return { message: "SUCCESS DELETING BLOG", status: 200 };
  } catch (error) {
    console.log("🔴🔴 OOPS COULDNT DELETE BLOG -- ", error);
    return {
      message: `🔴🔴 -- ERROR MESSAGE: ${error}`,
      status: 400,
    };
  }
};

export const updateBlog = async (blog: BlogType, blogId: string) => {
  try {
    await prisma.blog.update({
      where: { id: blogId },
      data: blog,
    });
    return { status: 200, message: "Success updating sermon!" };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Error updating sermon!" };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await prisma.user.findMany({});
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateUsersRole = async (
  userId: string,
  role: "ADMIN" | "MEMBER" | "OWNER" | "MINISTER"
) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        member: role,
      },
    });
    return { status: 200, message: "Success updating users role!" };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Error updating users role!" };
  }
};

export const updateSermon = async (sermonId: number, sermon: Sermon) => {
  try {
    await prisma.sermon.update({
      where: { id: sermonId },
      data: sermon,
    });
    return { status: 200, message: "Success updating sermon!" };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Error updating sermon!" };
  }
};

export const updateEvent = async (eventId: number, event: EventsType) => {
  try {
    await prisma.events.update({
      where: { id: eventId },
      data: event,
    });
    return { status: 200, message: "Success updating event!" };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Error updating event!" };
  }
};

export const deleteEvent = async (eventId: number) => {
  try {
    await prisma.events.delete({
      where: { id: eventId },
    });
    console.log({ status: 200, message: "Success deleting event!" });
    return { status: 200, message: "Success deleting event!" };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Error deleting event!" };
  }
};

export const isLive = async (): Promise<boolean> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube`;

    const response = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Live check API data:", data); // 👀
    return data?.isLive;
  } catch (error) {
    console.error("Error fetching live status:", error);
    return false;
  }
};
