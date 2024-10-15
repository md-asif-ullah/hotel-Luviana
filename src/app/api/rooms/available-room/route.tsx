import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import BookingModel from "@/models/BookingModel";

export async function GET(request: Request) {
  await connectToDB();

  try {
    const url = new URL(request.url);

    const roomId = url.searchParams.get("roomId");
    const checkIn = url.searchParams.get("checkIn");
    const checkOut = url.searchParams.get("checkOut");

    if (!roomId || !checkIn || !checkOut) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Please provide all the required fields",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const unavailableRooms = await BookingModel.aggregate([
      {
        $match: {
          roomId,
          $and: [
            { checkIn: { $lte: checkOutDate } },
            { checkOut: { $gte: checkInDate } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          unavailableRooms: {
            $push: {
              roomId: "$roomId",
              checkIn: "$checkIn",
              checkOut: "$checkOut",
            },
          },
        },
      },
    ]);

    return successResponse({
      status: 200,
      success: true,
      message: "Room is available for the selected dates",
      payload: unavailableRooms[0]?.unavailableRooms,
    });
  } catch (error: any) {
    return errorResponse({
      status: 400,
      success: false,
      message: error.message,
    });
  }
}
