import { errorResponse, successResponse } from "@/helper/handleResponse";
import cloudinary from "@/lib/cloudinary";
import connectToDB from "@/lib/ConnectToDB";
import Room from "@/models/RoomModels";

export async function GET(request: Request) {
  await connectToDB();
  try {
    const id = request.url.split("/").pop();

    const existingRooms = await Room.findById(id);

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

export async function DELETE(request: Request) {
  await connectToDB();
  try {
    const id = request.url.split("/").pop();

    const existingRooms = await Room.findByIdAndDelete(id);

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
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}

export async function PUT(req: Request) {
  await connectToDB();

  try {
    const id = req.url.split("/").pop();

    const formData = await req.formData();

    // For handling multiple image uploads and removals
    const newImages = formData.getAll("newImages") as File[];
    const removedImages = formData.getAll("removedImages") as string[];

    // Fetch the existing room document
    const existingRoom = await Room.findById(id);

    if (!existingRoom) {
      return errorResponse({
        status: 404,
        success: false,
        message: "No rooms found",
      });
    }

    let updatedImages = [...existingRoom.images];

    for (const imageURL of removedImages) {
      const publicId = imageURL.split("/").pop()?.split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(`hotel-luvina/rooms/${publicId}`);

        updatedImages = updatedImages.filter((img) => img !== imageURL);
      }
    }

    // Handle uploading new images to Cloudinary
    for (const image of newImages) {
      if (image instanceof File) {
        const buffer = await image.arrayBuffer();
        const uploadedImage = await cloudinary.uploader.upload(
          `data:${image.type};base64,${Buffer.from(buffer).toString("base64")}`,
          {
            folder: "hotel-luvina/rooms",
          }
        );

        updatedImages.push(uploadedImage.secure_url);
      }
    }

    const data = {
      roomName: formData.get("roomName") as string | null,
      categories: formData.get("categories") as string | null,
      adults: Number(formData.get("adults")),
      view: formData.get("view") as string | null,
      size: Number(formData.get("size")),
      bedType: formData.get("bedType") as string | null,
      amenities: formData.get("amenities") as string | null,
      children: Number(formData.get("children")),
      description: formData.get("description") as string | null,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      images: updatedImages,
    };

    const updatedRoom = await Room.findByIdAndUpdate(id, data, { new: true });

    if (!updatedRoom) {
      return errorResponse({
        status: 404,
        success: false,
        message: "Room update failed",
      });
    }

    return successResponse({
      status: 200,
      success: true,
      message: "Update successful",
      payload: updatedRoom,
    });
  } catch (error: any) {
    return errorResponse({
      status: 500,
      success: false,
      message: error.message,
    });
  }
}
