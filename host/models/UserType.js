import mongoose, { Schema } from "mongoose";

const userTypes = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserType = mongoose.model("UserType", userTypes);

export default UserType;
