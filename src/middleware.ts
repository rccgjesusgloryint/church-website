import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/media"]);

export default clerkMiddleware((auth, req) => {
  // console.log("Req: ", req.nextUrl);
  // console.log("SEARCH PARAMS: ", req.nextUrl.searchParams.toString());
  // if (isProtectedRoute(req))
  //   auth().protect((has) => {
  //     return (
  //       has({ permission: "org:sys_memberships:manage" }) ||
  //       has({ permission: "org:sys_domains_manage" })
  //     );
  //   });
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
