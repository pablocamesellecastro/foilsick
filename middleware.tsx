import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  if (pathname.startsWith("/Admin")) {
    const isAdmin = request.cookies.get("isAdmin")?.value === "true";

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin/:path*"],
};
