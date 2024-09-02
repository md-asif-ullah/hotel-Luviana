import { errorResponse, successResponse } from "@/helper/handleResponse";
import { cookies } from "next/headers";

export function GET() {
  try {
    const assesstoken = cookies().get("access_token");
    const refreshToken = cookies().get("refresh_token");
    if (!assesstoken || !refreshToken) {
      return errorResponse({
        status: 404,
        success: false,
        message: "you already logged out",
      });
    }

    cookies().delete("access_token");
    cookies().delete("refresh_token");

    return successResponse({
      status: 200,
      success: true,
      message: "Successfully logged out",
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
