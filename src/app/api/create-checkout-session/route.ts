import { errorResponse, successResponse } from "@/helper/handleResponse";
import { TotalPriceAndTotalDays } from "@/helper/TotalPriceAndTotalDays";
import BookingModel from "@/models/BookingModel";
import Room from "@/models/RoomModels";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: `2024-06-20`,
});

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    const origin = headers().get("origin");

    const findRoom = await Room.findById(data.roomId);

    if (!findRoom) {
      return errorResponse({
        status: 404,
        success: false,
        message: "Room not found",
      });
    }

    const { totalPrice } = TotalPriceAndTotalDays({
      price: findRoom?.price ?? 0,
      fromDate: new Date(data.checkIn),
      toDate: new Date(data.checkOut),
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      submit_type: "pay",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: findRoom.roomName,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    await BookingModel.create({
      ...data,
      bookingId: Date.now().toString() + Math.floor(Math.random() * 10000),
      roomName: findRoom.roomName,
      totalPrice,
      paymentIntentId: session.id,
      paymentStatus: "pending",
      roomImages: findRoom.images,
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
    });

    return successResponse({
      status: 200,
      success: true,
      message: "Session created successfully",
      payload: { id: session.id },
    });
  } catch (error: any) {
    console.log("error", error);
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
