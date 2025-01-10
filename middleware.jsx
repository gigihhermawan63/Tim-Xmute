import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value;

  if (
    request.nextUrl.pathname.startsWith("/api/admin-dashboard/laptop") ||
    request.nextUrl.pathname.startsWith("/admin-dashboard/laptop")
  ) {
    if (email !== "admin@gmail.com") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/admin-dashboard") {
    if (email !== "admin@gmail.com") {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.redirect(
        new URL("/admin-dashboard/laptop", request.url)
      );
    }
  }

  if (request.nextUrl.pathname === "/sign-in") {
    if (email === "admin@gmail.com") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
