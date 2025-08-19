import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { isSessionValid } from "@/lib/server-utils";

export async function middleware(req: NextRequest) {
  const session = await auth();
  if (isSessionValid(session)) {
    const url = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/startup/create", // e.g., your page route
};
