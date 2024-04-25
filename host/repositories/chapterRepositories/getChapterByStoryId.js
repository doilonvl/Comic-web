import Chapter from "../../models/Chapter.js";

export default async function getChapterByStoryId(sid, limit) {
  try {
    return await Chapter.find({ storyId: sid })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  } catch (error) {
    throw new Error(error);
  }
}
