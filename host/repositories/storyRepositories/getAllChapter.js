import Chapter from "../../models/Chapter.js";

const getAllChapter = async (storyId) => {
  try {
    const chapters = await Chapter.find({
      storyId: storyId,
      isActive: true,
    }).sort("chapterNo");
    return chapters;
  } catch (error) {
    throw new Error("Error while fetching chapters: " + error.message);
  }
};

export default getAllChapter;
