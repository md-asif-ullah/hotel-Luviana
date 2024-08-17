import mongoose, { Schema } from "mongoose";

export interface IUserMessageType extends mongoose.Document {
  name: string;
  email: string;
  message: string;
}

const userMessageSchema: Schema<IUserMessageType> = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    message: {
      type: String,
      required: [true, "message is required"],
    },
  },
  { timestamps: true }
);

const UserMessages =
  (mongoose.models.userMessages as mongoose.Model<IUserMessageType>) ||
  mongoose.model<IUserMessageType>("userMessages", userMessageSchema);

export default UserMessages;
