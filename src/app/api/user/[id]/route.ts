import { errorResponse, successResponse } from "@/helper/handleResponse";
import User from "@/models/userModel";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await User.findById(params.id);

    if (!user) {
      return errorResponse({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "User fetched successfully",
      payload: user,
    });
  } catch (error: any) {
    errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return errorResponse({
        status: 404,
        success: false,
        message: "User not found",
      });
    }
    return successResponse({
      status: 200,
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { data } = await req.json();

  try {
    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return errorResponse({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "User updated successfully",
      payload: user,
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
