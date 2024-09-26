import { errorResponse, successResponse } from "@/helper/handleResponse";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export async function GET() {
  try {
    const token = cookies().get("access_token");

    if (!token || !token.value) {
      return errorResponse({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const user = jwt.verify(token.value, process.env.JWT_ACCESS_SECRET!) as {
      user: {
        _id: string;
      };
    };

    const findUser = await User.findById(user.user._id);

    if (!findUser) {
      return errorResponse({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "User data",
      payload: { user: findUser },
    });
  } catch (error: any) {
    return errorResponse({
      status: 401,
      success: false,
      message: error.message,
    });
  }
}
