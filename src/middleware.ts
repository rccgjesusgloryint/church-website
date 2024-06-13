import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { POST } from "./app/api/webhooks/route";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
