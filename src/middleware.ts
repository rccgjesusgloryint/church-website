import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
