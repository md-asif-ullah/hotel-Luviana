import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import BookingModel from "@/models/BookingModel";
import { headers } from "next/headers";
import { send } from "process";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  await connectToDB();

  const body = await req.text();
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endPointSecret) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing Stripe webhook secret",
    });
  }

  let event: Stripe.Event;

  try {
    const sig = headers().get("stripe-signature");
    if (!sig) {
      return errorResponse({
        success: false,
        status: 400,
        message: "Missing Stripe signature",
      });
    }

    event = stripe.webhooks.constructEvent(body, sig, endPointSecret);

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent & {
          customer_details: { email: string };
        };

        // TODO:sending email to the customer and fixed the booking status

        await BookingModel.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          {
            paymentIntentId: paymentIntent.id,
            paymentStatus: "succeeded",
            email: paymentIntent.customer_details.email,
          }
        );

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return successResponse({
      status: 200,
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error: any) {
    console.error("General Error:", error.message);
    return errorResponse({
      status: 500,
      success: false,
      message: "Webhook processing error",
    });
  }
}
