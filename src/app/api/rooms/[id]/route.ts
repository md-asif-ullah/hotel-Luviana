import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import Room from "@/models/RoomModels";

export async function GET(request: Request) {
  await connectToDB();
  try {
    const id = request.url.split("/").pop();

    const existingRooms = await Room.findById(id);

    if (!existingRooms) {
      return errorResponse({
        status: 404,
        success: false,
        message: "No rooms found",
      });
    }

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

export async function DELETE(request: Request) {
  await connectToDB();
  try {
    const id = request.url.split("/").pop();

    const existingRooms = await Room.findByIdAndDelete(id);

    if (!existingRooms) {
      return errorResponse({
        status: 404,
        success: false,
        message: "No rooms found",
      });
    }

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
