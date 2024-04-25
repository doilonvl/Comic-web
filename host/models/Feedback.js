import mongoose, { Schema } from "mongoose";
import Story from "./Story.js";
import User from "./Users.js";

const feedbackSchema = new Schema(
  {
    storyId: {
      type: Schema.Types.ObjectId,
      ref: Story,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("FeedBack", feedbackSchema);

export default Feedback;
