import { errorResponse, successResponse } from "@/helper/handleResponse";
import JwtToken from "@/helper/JwtToken";
import connectToDB from "@/lib/ConnectToDB";
import User from "@/models/userModel";

export async function POST(request: Request) {
  await connectToDB();

  try {
    const { email, verificationCode } = await request.json();

    const existUser = await User.findOne({ email }).select("-password");

    if (!existUser) {
      return errorResponse({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    if (existUser.verificationCode !== verificationCode) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Invalid verification code",
      });
    }
    if (existUser.verificationCodeExpires < Date.now()) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Verification code expired",
      });
    }

    existUser.isVerified = true;

    await existUser.save();

    JwtToken({
      name: "access_token",
      data: { user: existUser },
      secret: process.env.JWT_ACCESS_SECRET || "",
      expiresTime: "1d",
      maxAge: 60 * 60 * 24,
    });

    JwtToken({
      name: "refresh_token",
      data: { user: existUser },
      secret: process.env.JWT_REFRESH_SECRET || "",
      expiresTime: "7d",
      maxAge: 60 * 60 * 24 * 7,
    });

    return successResponse({
      status: 200,
      success: true,
      message: "User verified successfully",
      payload: { user: existUser },
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: "error somthing went worn",
    });
  }
}
