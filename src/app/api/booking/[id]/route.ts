import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import BookingModel from "@/models/BookingModel";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  try {
    const { id } = params;

    if (!id) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Invalid booking ID",
      });
    }

    const bookingData = await BookingModel.findById(id);

    return successResponse({
      status: 200,
      success: true,
      message: "Booking found",
      payload: bookingData,
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
