import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

interface JwtPayload {
  user: {
    isAdmin: boolean;
  };
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;

  let isAdmin = false;

  if (!token && refreshToken) {
    try {
      // Verify the refresh token
      const refreshSecret = new TextEncoder().encode(
        process.env.JWT_REFRESH_SECRET
      );
      const { payload } = (await jwtVerify(refreshToken, refreshSecret)) as {
        payload: JwtPayload;
      };

      // Generate a new access token
      const newAccessToken = await new SignJWT({ user: payload.user })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(process.env.JWT_ACCESS_SECRET));

      // Set the new access token in the response cookies
      const response = NextResponse.next();
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });

      isAdmin = payload?.user?.isAdmin || false; // Extract isAdmin
      return response;
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (token) {
    try {
      // Verify the access token
      const accessSecret = new TextEncoder().encode(
        process.env.JWT_ACCESS_SECRET
      );
      const { payload } = (await jwtVerify(token, accessSecret)) as {
        payload: JwtPayload;
      };

      isAdmin = payload?.user?.isAdmin || false;
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
    pathname === "/dashboard/profile" ||
    pathname === "/dashboard/booking";

  const adminPaths =
    pathname === "/dashboard/rooms/add-room" ||
    pathname === "/dashboard/customers" ||
    pathname === "/dashboard/booking-list" ||
    pathname === "/dashboard/rooms";

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
  matcher: ["/:path*"],
};
