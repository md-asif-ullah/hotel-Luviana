import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import User from "@/models/userModel";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  const { id } = params;
  const data = await req.json();

  try {
    if (!data) {
      return errorResponse({
        status: 404,
        success: false,
        message: "user information missing",
      });
    }

    const updatedData = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedData) {
      return errorResponse({
        status: 404,
        success: false,
        message: "user not found",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "user information updated",
      payload: updatedData,
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
