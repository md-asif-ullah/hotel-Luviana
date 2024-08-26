import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import sendUserMail from "@/lib/sendMail";
import User from "@/models/userModel";

export async function POST(request: Request) {
  await connectToDB();
  try {
    const { name, email, password } = await request.json();

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationCodeExpires = Date.now() + 120000;

    const userExistVerified = await User.findOne({
      email,
    });
    if (userExistVerified) {
      if (userExistVerified.isVerified) {
        return errorResponse({
          status: 400,
          success: false,
          message: "User already exists",
        });
      } else {
        userExistVerified.verificationCode = verificationCode;
        userExistVerified.verificationCodeExpires = verificationCodeExpires;
        await userExistVerified.save();
      }
    } else {
      const newUser = new User({
        name,
        email,
        password,
        verificationCode,
        verificationCodeExpires,
      });

      await newUser.save();
    }

    const mailData = {
      from: process.env.SMTP_USERNAME,
      to: email,
      subject: "Email Verification",
      html: `<h3>Use this verification code below to sign up</h3>
                <hr/>
                <p>Your verification code is: <strong>${verificationCode}</strong></p>`,
    };

    const sendMail = await sendUserMail(mailData);

    if (!sendMail) {
      return errorResponse({
        status: 500,
        success: false,
        message: "Email could not be sent",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "successfully",
      payload: { email },
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
