import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import Room from "@/models/RoomModels";

export async function GET() {
  await connectToDB();
  try {
    const existingRooms = await Room.find();

    return successResponse({
      status: 200,
      success: true,
      message: "successfully",
      payload: existingRooms,
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
