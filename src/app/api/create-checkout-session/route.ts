import { errorResponse, successResponse } from "@/helper/handleResponse";
import BookingModel from "@/models/BookingModel";
import Room from "@/models/RoomModels";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: `2024-06-20`,
});

export async function POST(req: Request) {
  try {
    const { newFormData } = await req.json();

    const origin = headers().get("origin");

    const amount = newFormData.totalPrice * 100;

    const findRoom = await Room.findById(newFormData.roomId);

    if (!findRoom) {
      return errorResponse({
        status: 404,
        success: false,
        message: "Room not found",
      });
    }

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
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],

      metadata: newFormData,

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    await BookingModel.create({
      ...newFormData,
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
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
