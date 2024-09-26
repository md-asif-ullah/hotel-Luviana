import mongoose, { Schema } from "mongoose";

export interface IBookingType extends mongoose.Document {
  name: string;
  email: string;
  message?: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  paymentMethod: string;
  phoneNumber: string;
  roomQuantity: number;
  totalPrice: number;
  bookingStatus: string;
  paymentStatus: string;
  paymentIntentId?: string;
  userId: string;
  roomName: string;
  roomImages: string[];
  bookingId: string;
}

const bookingSchema: Schema<IBookingType> = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
    },
    message: {
      type: String,
    },
    roomId: {
      type: String,
      required: [true, "roomId is required"],
    },
    checkIn: {
      type: String,
      required: [true, "checkIn is required"],
    },
    checkOut: {
      type: String,
      required: [true, "checkOut is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "paymentMethod is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required"],
    },
    roomQuantity: {
      type: Number,
      required: [true, "roomQuantity is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "totalPrice is required"],
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cash"],
    },
    paymentIntentId: {
      type: String,
    },
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    roomName: {
      type: String,
      required: [true, "roomName is required"],
    },
    roomImages: {
      type: [String],
      required: [true, "roomImages is required"],
    },
    bookingId: {
      type: String,
      required: [true, "BookingId is required"],
    },
  },
  { timestamps: true }
);

const BookingModel =
  (mongoose.models.booking as mongoose.Model<IBookingType>) ||
  mongoose.model<IBookingType>("booking", bookingSchema);

export default BookingModel;
