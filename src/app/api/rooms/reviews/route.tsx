import { errorResponse, successResponse } from "@/helper/handleResponse";
import connectToDB from "@/lib/ConnectToDB";
import Review from "@/models/ReviewModel";

export async function POST(req: Request) {
  await connectToDB();
  try {
    const reviewData = await req.json();

    const review = await Review.create(reviewData);

    if (!review) {
      return errorResponse({
        status: 400,
        success: false,
        message: "Review not created",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "Review created successfully",
      payload: review,
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}

export async function GET(req: Request) {
  await connectToDB();
  try {
    const reviews = await Review.find();
    return successResponse({
      status: 200,
      success: true,
      message: "Reviews fetched successfully",
      payload: reviews,
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
