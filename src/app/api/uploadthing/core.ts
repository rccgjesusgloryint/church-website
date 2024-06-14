import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const authenticateUser = async () => {
  const user = auth();
  // If you throw, the user will not be able to upload
  if (!user) throw new Error("Unauthorized");
  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return user;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pictures: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete((data) => {}),
  eventPosterImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete((data) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
