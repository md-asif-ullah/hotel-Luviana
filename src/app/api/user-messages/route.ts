import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import UserMessages from "@/models/MessageModel";

export async function POST(request: Request) {
  await connectToDB();
  try {
    const message = await request.json();

    await UserMessages.create(message);

    return successResponse({
      status: 200,
      success: true,
      message: "successfully",
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
