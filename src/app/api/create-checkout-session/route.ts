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
      roomQuantity: data.roomQuantity,
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
              name: findRoom.name,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    console.log("session", session);

    await BookingModel.create({
      ...data,
      totalPrice,
      paymentIntentId: session.id,
      paymentStatus: "pending",
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
