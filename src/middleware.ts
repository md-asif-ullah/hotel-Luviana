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

  if (!token && refreshToken) {
    try {
      // Verify the refresh token
      const secret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);
      const { payload } = (await jwtVerify(refreshToken, secret)) as {
        payload: JwtPayload;
      };

      // Generate a new access token
      const newAccessToken = await new SignJWT({ user: payload.user })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(process.env.JWT_REFRESH_SECRET));

      // Set the new access token in the response cookies
      const response = NextResponse.next();
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 1,
      });

      return response;
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

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
  matcher: ["/:path*"],
};
