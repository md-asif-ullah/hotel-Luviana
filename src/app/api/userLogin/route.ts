import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import JwtToken from "@/helper/JwtToken";

export async function POST(request: Request) {
  await connectToDB();
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Invalid email",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Invalid password",
      });
    }

    const userWithOutPassword = user.toObject();
    userWithOutPassword.password = "";

    if (user.isBanned) {
      return errorResponse({
        status: 400,
        success: false,
        message: " User is banned . Please contact admin",
      });
    }
    if (!user.isVerified) {
      return errorResponse({
        status: 400,
        success: false,
        message: "User is not verified",
      });
    }

    JwtToken({
      name: "access_token",
      data: { user: userWithOutPassword },
      secret: process.env.JWT_ACCESS_SECRET || "",
      expiresTime: "1d",
      maxAge: 60 * 60 * 24,
    });

    JwtToken({
      name: "refresh_token",
      data: { user: userWithOutPassword },
      secret: process.env.JWT_REFRESH_SECRET || "",
      expiresTime: "7d",
      maxAge: 60 * 60 * 24 * 7,
    });

    return successResponse({
      status: 200,
      success: true,
      message: "successfully",
      payload: { user: userWithOutPassword },
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
