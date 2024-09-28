import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface JwtPayload {
  user: {
    isAdmin: boolean;
  };
}

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  let isAdmin;

  if (token) {
    try {
      // Verify the token using jose
      const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
      const { payload } = (await jwtVerify(token, secret)) as {
        payload: JwtPayload;
      };

      isAdmin = payload?.user?.isAdmin;
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const publicPaths =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/verify");
  const userPaths =
    pathname.startsWith("/rooms/") ||
    pathname === "/deshboard/profile" ||
    pathname === "/deshboard/booking";

  const adminPaths =
    pathname === "/deshboard/add-room" ||
    pathname === "/deshboard/customers" ||
    pathname === "/deshboard/booking-list" ||
    pathname === "/deshboard/rooms";

  if (token && publicPaths) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && userPaths) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isAdmin && adminPaths) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/rooms/:id*", "/login", "/signup", "/verify", "/deshboard/:path*"],
};
