import mongoose, { Schema } from "mongoose";

const storySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived", "finished", "ongoing"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
