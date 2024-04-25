import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    img: {
      type: String,
    },
    role: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);

export default User;
