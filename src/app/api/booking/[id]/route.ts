import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import BookingModel from "@/models/BookingModel";
import mongoose from "mongoose";

export async function GET(req: Request) {
  await connectToDB();

  try {
    const id = req.url.split("/").pop();

    if (!id) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Invalid booking ID",
      });
    }

    const bookingData = await BookingModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $addFields: {
          roomId: { $toObjectId: "$roomId" },
        },
      },
      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "_id",
          as: "BookingDetails",
        },
      },
      {
        $unwind: { path: "$BookingDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          checkIn: 1,
          checkOut: 1,
          paymentStatus: 1,
          bookingStatus: 1,
          createdAt: 1,
          totalPrice: 1,
          roomName: "$BookingDetails.roomName",
          roomImages: "$BookingDetails.images",
        },
      },
    ]);

    if (!bookingData || bookingData.length === 0) {
      return errorResponse({
        status: 404,
        success: false,
        message: "Booking not found",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "Booking found",
      payload: bookingData[0],
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
