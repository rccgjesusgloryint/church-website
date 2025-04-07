import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pictures: f({ image: { maxFileSize: "1GB", maxFileCount: 25 } })
    // .middleware(authenticateUser)
    .onUploadComplete((data) => {
      // console.log("DATA: ", data);
    }),
  eventPosterImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    // .middleware(authenticateUser)
    .onUploadComplete((data) => {}),
  blogImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    // .middleware(authenticateUser)
    .onUploadComplete((data) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
