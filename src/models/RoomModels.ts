import mongoose, { Schema } from "mongoose";

export interface IRoom extends mongoose.Document {
  name: string;
  categories: string;
  adults: number;
  view: string;
  size: number;
  bedType: string;
  amenities: string;
  children: number;
  description: string;
  price: number;
  images: Array<string>;
  quantity: number;
  paymentIntentId?: string;
  paymentStatus?: string;
}

const roomSchema: Schema<IRoom> = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    categories: {
      type: String,
      required: [true, "categories is required"],
    },
    adults: {
      type: Number,
      required: [true, "adults is required"],
    },
    children: {
      type: Number,
    },
    view: {
      type: String,
      required: [true, "view is required"],
    },
    size: {
      type: Number,
      required: [true, "size is required"],
    },
    bedType: {
      type: String,
      required: [true, "bedType is required"],
    },
    amenities: {
      type: String,
      required: [true, "amenities is required"],
    },
    images: {
      type: [String],
      required: [true, "images is required "],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    paymentIntentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

const Room =
  (mongoose.models.Room as mongoose.Model<IRoom>) ||
  mongoose.model<IRoom>("Room", roomSchema);

export default Room;
