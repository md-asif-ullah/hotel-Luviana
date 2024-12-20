import { errorResponse, successResponse } from "@/helper/handleResponse";
import { TotalPriceAndTotalDays } from "@/helper/TotalPriceAndTotalDays";
import connectToDB from "@/lib/ConnectToDB";
import BookingModel from "@/models/BookingModel";
import Room from "@/models/RoomModels";
import User from "@/models/userModel";

export async function POST(req: Request) {
  await connectToDB();
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
      fromDate: new Date(data.checkIn),
      toDate: new Date(data.checkOut),
    });

    const newBookingData = {
      ...data,
      totalPrice,
      bookingId: Date.now().toString() + Math.floor(Math.random() * 10000),
      roomName: findroom.roomName,
      roomImages: findroom.images,
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
    };

    const createBooking = await BookingModel.create(newBookingData);

    if (!createBooking) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Booking not created",
      });
    }

    await User.findByIdAndUpdate(
      data.userId,
      { phoneNumber: data.phoneNumber },
      { new: true }
    );

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

export async function GET(request: Request) {
  await connectToDB();

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const newPage = parseInt(page as string);
  const newLimit = parseInt(limit as string);

  const searchRegex = new RegExp(".*" + search + ".*", "i");

  const filter = {
    $or: [{ name: { $regex: searchRegex } }],
  };
  try {
    const bookingData = await BookingModel.find(filter)
      .limit(newLimit * 1)
      .skip((newPage - 1) * newLimit);

    const totalBookingData = await BookingModel.countDocuments();
    const allBookingStatus = await BookingModel.find({}, "bookingStatus");

    if (!bookingData) {
      return errorResponse({
        status: 400,
        success: false,
        message: "No booking found",
      });
    }
    if (!allBookingStatus) {
      return errorResponse({
        status: 400,
        success: false,
        message: "No booking status found",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "Booking found",
      payload: {
        allBookingStatus,
        bookingData,
        pagination: {
          totalPages: Math.ceil(totalBookingData / newLimit),
          prevoiusPage: newPage - 1 > 0 ? newPage - 1 : null,
          nextPage:
            newPage + 1 <= Math.ceil(totalBookingData / newLimit)
              ? newPage + 1
              : null,
        },
      },
    });
  } catch (error: any) {
    return errorResponse({
      status: 400,
      success: false,
      message: error.message,
    });
  }
}

export async function PUT(req: Request) {
  await connectToDB();
  try {
    const data = await req.json();

    if (!data) {
      return errorResponse({
        status: 400,
        success: false,
        message: "No data provided",
      });
    }

    const updateBooking = await BookingModel.findByIdAndUpdate(
      data.id,
      { bookingStatus: data.bookingStatus },
      {
        new: true,
      }
    );

    if (!updateBooking) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Booking not updated",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "Booking updated successfully",
      payload: updateBooking,
    });
  } catch (error: any) {
    return errorResponse({
      status: 400,
      success: false,
      message: error.message,
    });
  }
}
