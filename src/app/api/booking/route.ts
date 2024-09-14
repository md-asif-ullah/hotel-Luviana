import { errorResponse, successResponse } from "@/helper/handleResponse";
import { TotalPriceAndTotalDays } from "@/helper/TotalPriceAndTotalDays";
import BookingModel from "@/models/BookingModel";
import Room from "@/models/RoomModels";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data) {
      return errorResponse({
        status: 400,
        success: false,
        message: "No data provided",
      });
    }

    const findroom = await Room.findById(data?.roomId);

    if (!findroom) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Room not found",
      });
    }

    const { totalPrice } = TotalPriceAndTotalDays({
      price: findroom?.price ?? 0,
      roomQuantity: data.roomQuantity,
      fromDate: new Date(data.checkIn),
      toDate: new Date(data.checkOut),
    });

    const createBooking = await BookingModel.create({ ...data, totalPrice });

    if (!createBooking) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Booking not created",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "Booking created successfully",
      payload: createBooking,
    });
  } catch (error: any) {
    return errorResponse({
      status: 400,
      success: false,
      message: error.message,
    });
  }
}
