/**
 * middleware.ts — Route Protection
 *
 * Schützt /workspace/* Routen (außer /workspace/login und /workspace/register).
 * Wenn kein gültiger Session-Cookie vorhanden ist, wird zu /workspace/login redirected.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_WORKSPACE_ROUTES = ["/workspace/login", "/workspace/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/workspace")) {
    return NextResponse.next();
  }

  if (PUBLIC_WORKSPACE_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("session");

  if (!sessionCookie?.value) {
    const loginUrl = new URL("/workspace/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/workspace/:path*"],
};
