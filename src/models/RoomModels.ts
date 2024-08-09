import mongoose, { Schema } from "mongoose";

export interface IRoom {
  name: string;
  categories: string;
  adults: number;
  children: number;
  view: string;
  size: number;
  bedType: string;
  amenities: string;
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
  },
  { timestamps: true }
);

const Room =
  (mongoose.models.Room as mongoose.Model<IRoom>) ||
  mongoose.model<IRoom>("Room", roomSchema);

export default Room;
