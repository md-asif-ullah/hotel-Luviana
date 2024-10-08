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
  try {
    const existingRooms = await Room.find();

    if (!existingRooms) {
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
      payload: existingRooms,
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
