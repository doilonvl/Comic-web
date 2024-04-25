import mongoose, { Schema } from "mongoose";

const chapterContentSchema = new Schema(
  {
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    paragraph: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const ChapterContent = mongoose.model("ChapterContent", chapterContentSchema);

export default ChapterContent;
