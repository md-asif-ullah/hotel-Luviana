import { errorResponse, successResponse } from "@/helper/handleResponse";
import cloudinary from "@/lib/cloudinary";
import connectToDB from "@/lib/ConnectToDB";
import Room from "@/models/RoomModels";

export async function POST(req: Request) {
  await connectToDB();

  try {
    const formData = await req.formData();
    const images = formData.getAll("images");

    if (images.length === 0) {
      return new Response(
        JSON.stringify({ message: "Please upload at least one image" }),
        { status: 400 }
      );
    }
    const allImages = [];

    for (const image of images) {
      if (image instanceof File) {
        const buffer = await image.arrayBuffer();
        const uploadedImage = await cloudinary.uploader.upload(
          `data:${image.type};base64,${Buffer.from(buffer).toString("base64")}`,
          {
            folder: "hotel-luvina/rooms",
          }
        );

        allImages.push(uploadedImage.secure_url);
      }
    }

    const data = {
      roomName: formData.get("roomName"),
      categories: formData.get("categories"),
      adults: Number(formData.get("adults")),
      view: formData.get("view"),
      size: Number(formData.get("size")),
      bedType: formData.get("bedType"),
      amenities: formData.get("amenities"),
      children: Number(formData.get("children")),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      images: allImages,
    };

    const addRoom = await Room.create(data);

    return successResponse({
      status: 200,
      success: true,
      message: "room create successfully",
      payload: addRoom,
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

  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const searchRegex = new RegExp(".*" + search + ".*", "i");

  const filter = {
    $or: [{ roomName: { $regex: searchRegex } }],
  };

  try {
    const rooms = await Room.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    // Count filtered documents
    const totalRooms = await Room.countDocuments(filter);

    if (!rooms.length) {
      return errorResponse({
        status: 404,
        success: false,
        message: "No rooms found",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "successfully",
      payload: {
        rooms,
        pagination: {
          totalPages: Math.ceil(totalRooms / limit),
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(totalRooms / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
