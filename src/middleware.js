import { NextResponse } from "next/server";

export default async function middleware(req) {
  const loggedin = req.cookies.get("contract_app_user");
  const { pathname } = req.nextUrl;

  // const protectedRoutes = ["*/dashboard"];
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (!loggedin && isDashboardRoute) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "ALLOWALL");
  res.headers.set("Content-Security-Policy", "frame-ancestors *");
  return res;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
