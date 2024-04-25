import mongoose, { Schema } from "mongoose";

const RateStorySchema = new Schema(
  {
    rateNo: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      required: true,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    storyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
  },
  {
    timestamps: true,
  }
);

RateStorySchema.index({ userId: 1, storyId: 1 }, { unique: true });

const RateStory = mongoose.model("RateStory", RateStorySchema);

export default RateStory;