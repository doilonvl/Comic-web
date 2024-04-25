import Chapter from "../../models/Chapter.js";

export default async function createChapter({
  storyId,
  chapterNo = 1,
  isActive,
  name,
}) {
  try {
    const lastChapter = await Chapter.findOne({ storyId: storyId }).sort({
      chapterNo: -1,
    });

    const newChapterNo = lastChapter ? lastChapter.chapterNo + 1 : chapterNo;

    return await Chapter.create({
      storyId,
      chapterNo: newChapterNo,
      name,
      isActive,
    });
  } catch (error) {
    throw new Error(error);
  }
}
