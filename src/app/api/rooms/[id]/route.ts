import { errorResponse, successResponse } from "@/helper/handleResponse";
import cloudinary from "@/lib/cloudinary";
import connectToDB from "@/lib/ConnectToDB";
import Review from "@/models/ReviewModel";
import Room from "@/models/RoomModels";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await connectToDB();
  try {
    const roomDetails = await Room.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(params.id),
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "roomId",
          as: "reviews",
        },
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "reviews.userId",
          foreignField: "_id",
          as: "reviewUser",
        },
      },
      {
        $unwind: {
          path: "$reviewUser",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          roomDetails: {
            $first: {
              _id: "$_id",
              roomName: "$roomName",
              categories: "$categories",
              adults: "$adults",
              view: "$view",
              size: "$size",
              bedType: "$bedType",
              amenities: "$amenities",
              children: "$children",
              description: "$description",
              price: "$price",
              images: "$images",
            },
          },
          reviews: {
            $push: {
              $cond: [
                { $gt: ["$reviews", null] },
                {
                  name: "$reviewUser.name",
                  comment: "$reviews.comment",
                  comfort_rating: "$reviews.comfort_rating",
                  location_rating: "$reviews.location_rating",
                  service_rating: "$reviews.service_rating",
                  staff_rating: "$reviews.staff_rating",
                  createdAt: "$reviews.createdAt",
                },
                null,
              ],
            },
          },
        },
      },
      {
        $addFields: {
          reviews: {
            $filter: {
              input: "$reviews",
              as: "review",
              cond: { $ne: ["$$review", null] },
            },
          },
        },
      },
    ]);

    if (!roomDetails) {
      return NextResponse.json(
        {
          success: true,
          message: "room not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "successfully",
        payload: roomDetails[0],
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  try {
    const existingRooms = await Room.findByIdAndDelete(params.id);

    if (!existingRooms) {
      return errorResponse({
        status: 404,
        success: false,
        message: "No rooms found",
      });
    }

    existingRooms.images.forEach(async (image) => {
      const publicId = image.split("/").pop()?.split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(`hotel-luvina/rooms/${publicId}`);
      }
    });

    await Review.deleteMany({ roomId: new mongoose.Types.ObjectId(params.id) });

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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  try {
    const id = params.id;

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
