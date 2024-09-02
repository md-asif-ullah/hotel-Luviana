import { errorResponse, successResponse } from "@/helper/handleResponse";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import JwtToken from "@/helper/JwtToken";

export function GET(req: Request) {
  try {
    const refreshToken = cookies().get("refresh_token");
    if (!refreshToken) {
      return errorResponse({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      refreshToken.value,
      process.env.JWT_REFRESH_SECRET!
    );

    if (!decoded) {
      return errorResponse({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    JwtToken({
      name: "access_token",
      data: { decoded },
      secret: process.env.JWT_ACCESS_SECRET || "",
      expiresTime: "1d",
      maxAge: 60 * 60 * 24,
    });

    return successResponse({
      status: 200,
      success: true,
      message: "token refreshed successfully",
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: "something went worn",
    });
  }
}
