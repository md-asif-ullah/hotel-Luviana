import mongoose, { Schema } from "mongoose";

export interface IReviewType extends mongoose.Document {
  roomId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  comfort_rating: number;
  location_rating: number;
  service_rating: number;
  staff_rating: number;
  bookingId: mongoose.Schema.Types.ObjectId;
}

const reviewSchema: Schema<IReviewType> = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    comment: { type: String, required: true },
    comfort_rating: { type: Number, required: true },
    location_rating: { type: Number, required: true },
    service_rating: { type: Number, required: true },
    staff_rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const Review =
  (mongoose.models.reviews as mongoose.Model<IReviewType>) ||
  mongoose.model<IReviewType>("reviews", reviewSchema);

export default Review;
