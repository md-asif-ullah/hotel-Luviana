import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserType extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  verificationCodeExpires: number;
  isVerified: boolean;
  isBanned: boolean;
}

const userSchema: Schema<IUserType> = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "please enter your email"],
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      set: (val: string) => bcrypt.hashSync(val, 10),
    },
    verificationCode: {
      type: String,
    },
    verificationCodeExpires: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const User =
  (mongoose.models.user as mongoose.Model<IUserType>) ||
  mongoose.model<IUserType>("user", userSchema);

export default User;
