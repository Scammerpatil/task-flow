import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const verifyToken = async (token: string, baseURL: string) => {
  try {
    const response = await fetch(
      `${baseURL}/api/auth/middleware-verify-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (!response.ok) throw new Error("Token verification failed");

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Response was not JSON");
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicPath = ["/"].includes(pathname);
  const baseURL = req.nextUrl.origin;

  const token = req.cookies.get("token")?.value || "";
  const isLoggedIn = !!token;

  if (!isLoggedIn && !isPublicPath) {
    console.log("Not logged in, redirecting to public login page");
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (isLoggedIn) {
    const user = await verifyToken(token, baseURL);
    if (!user) {
      console.log("Token verification failed, redirecting to login");
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    const { role, isApproved } = user.data;
    if (!isApproved) {
      console.log("User not approved, redirecting to login");
      return NextResponse.redirect
        ? NextResponse.redirect(new URL("/not-approved", req.nextUrl.origin))
        : NextResponse.next();
    }
    const dashboardPath = `/${role}/dashboard`;
    if (isPublicPath) {
      return NextResponse.redirect(new URL(dashboardPath, req.nextUrl.origin));
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/manager/:path*", "/team-member/:path*"],
};
