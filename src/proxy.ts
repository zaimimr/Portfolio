import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const valImagePattern =
  /^\/val\/[\w./-]+\.(?:webp|png|jpe?g|gif|svg|avif|ico)$/i;

export const proxy = auth((request) => {
  if (valImagePattern.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  if (request.auth) {
    return NextResponse.next();
  }
  const signInUrl = new URL("/sign-in", request.nextUrl.origin);
  signInUrl.searchParams.set(
    "callbackUrl",
    request.nextUrl.pathname + request.nextUrl.search,
  );
  return NextResponse.redirect(signInUrl);
});

export const config = {
  matcher: ["/admin/:path*", "/val", "/val/:path*"],
};
