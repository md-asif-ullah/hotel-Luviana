import { errorResponce, successResponce } from "@/helper/handleResponce";
import connectToDB from "@/lib/ConnectToDB";
import Room from "@/models/RoomModels";

export async function GET(request: Request) {
  await connectToDB();
  try {
    const id = request.url.split("/").pop();

    const existingRooms = await Room.findById(id);

    return successResponce({
      status: 200,
      success: true,
      message: "successfully",
      payload: existingRooms,
    });
  } catch (error: any) {
    return errorResponce({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
