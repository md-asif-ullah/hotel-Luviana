import { errorResponse, successResponse } from "@/helper/handleResponse";
import User from "@/models/userModel";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const newPage = parseInt(page as string);
  const newLimit = parseInt(limit as string);

  const searchRegex = new RegExp(".*" + search + ".*", "i");

  const filter = {
    $or: [
      { name: { $regex: searchRegex } },
      { email: { $regex: searchRegex } },
      { phone: { $regex: searchRegex } },
    ],
  };

  try {
    const users = await User.find(filter)
      .select("-password")
      .limit(newLimit * 1)
      .skip((newPage - 1) * newLimit);

    const totalProducts = await User.countDocuments();

    return successResponse({
      status: 200,
      success: true,
      message: "Users fetched successfully",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(totalProducts / newLimit),
          prevoiusPage: newPage - 1 > 0 ? newPage - 1 : null,
          nextPage:
            newPage + 1 <= Math.ceil(totalProducts / newLimit)
              ? newPage + 1
              : null,
        },
      },
    });
  } catch (error: any) {
    errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
