import mongoose, { Schema } from "mongoose";
import Story from "./Story.js";
import User from "./Users.js";

const FollowStorySchema = new Schema({
    storyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Story
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    }
}, {
    timestamps: true
});

FollowStorySchema.index({ userId: 1, storyId: 1 }, { unique: true });

const FollowStory = mongoose.model("FollowStories", FollowStorySchema);

export default FollowStory;

