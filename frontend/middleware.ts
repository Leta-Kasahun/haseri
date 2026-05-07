import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPages = [
  "/login",
  "/register/customer",
  "/register/provider",
  "/admin/login",
  "/admin/verify-otp",
  "/forgot-password",
];
const adminAuthPages = ["/admin/login", "/admin/verify-otp"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminAuthRoute = adminAuthPages.some((path) => pathname.startsWith(path));

  const refreshToken = request.cookies.get("refresh_token")?.value;
  const adminToken = request.cookies.get("admin_refresh_token")?.value;
  const roleCookie = request.cookies.get("role")?.value;
  const normalizedRole = roleCookie?.toLowerCase();
  const userHome =
    normalizedRole === "customer"
      ? "/customer"
      : normalizedRole === "provider" || normalizedRole === "technician"
        ? "/technician"
        : "/dashboard";

  if (authPages.some((path) => pathname.startsWith(path))) {
    if (isAdminAuthRoute && adminToken) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (!isAdminAuthRoute && refreshToken) {
      return NextResponse.redirect(new URL(userHome, request.url));
    }
    return NextResponse.next();
  }

  if (isAdminRoute && !isAdminAuthRoute) {
    if (adminToken) return NextResponse.next();

    if (refreshToken) {
      return NextResponse.redirect(new URL(userHome, request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};