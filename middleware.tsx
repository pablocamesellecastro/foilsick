import { NextRequest, NextResponse } from "next/server";

// filepath: /Users/pablocamesellecastro/foilsick/middleware.tsx

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rutas de admin
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
