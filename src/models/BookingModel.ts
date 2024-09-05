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
  totalPrice: string;
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
      type: String,
      required: [true, "totalPrice is required"],
    },
  },
  { timestamps: true }
);

const BookingModel =
  (mongoose.models.booking as mongoose.Model<IBookingType>) ||
  mongoose.model<IBookingType>("booking", bookingSchema);

export default BookingModel;
