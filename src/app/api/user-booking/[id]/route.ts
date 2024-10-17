import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import BookingModel from "@/models/BookingModel";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  try {
    const { id } = params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Invalid booking ID",
      });
    }

    const userBookingData = await BookingModel.find({ userId: id });

    if (!userBookingData) {
      return errorResponse({
        status: 400,
        success: false,
        message: "No booking found",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "Booking found",
      payload: userBookingData,
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
