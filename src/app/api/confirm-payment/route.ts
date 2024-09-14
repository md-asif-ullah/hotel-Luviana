import { errorResponse, successResponse } from "@/helper/handleResponse";
import BookingModel from "@/models/BookingModel";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const booking = await BookingModel.findOneAndUpdate(
        { paymentIntentId: sessionId },
        { paymentStatus: "success" }
      );

      if (!booking) {
        return errorResponse({
          status: 404,
          success: false,
          message: "Booking not completed.",
        });
      }
    }

    return successResponse({
      status: 200,
      success: true,
      message: "Payment processed successfully.",
    });
  } catch (error) {
    return errorResponse({
      status: 500,
      success: false,
      message: "An error occurred while processing the payment.",
    });
  }
}
