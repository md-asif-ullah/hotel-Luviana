import { errorResponse, successResponse } from "@/helper/handleResponse";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function GET() {
  try {
    const token = cookies().get("access_token");

    if (!token || !token.value) {
      return errorResponse({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const user = jwt.verify(token.value, process.env.JWT_ACCESS_SECRET!);

    return successResponse({
      status: 200,
      success: true,
      message: "User data",
      payload: user,
    });
  } catch (error: any) {
    return errorResponse({
      status: 401,
      success: false,
      message: error.message,
    });
  }
}
