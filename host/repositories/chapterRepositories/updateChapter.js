import Chapter from "../../models/Chapter.js";
import Story from "../../models/Story.js";

export default async function updateChapter(cId, chapter) {
  try {
    await Story.findByIdAndUpdate(chapter.storyId, {
      $set: {
        updatedAt: new Date(),
      },
    });
    return await Chapter.findByIdAndUpdate(cId, chapter);
  } catch (error) {
    throw new Error(error);
  }
}
