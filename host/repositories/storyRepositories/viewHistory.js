import Chapter from "../../models/Chapter.js";

const findHistoryStory = async (chapterNo, storyId) => {
  try {
    const chapter = await Chapter.findOne({
      chapterNo: parseInt(chapterNo),
      storyId: storyId,
    }).populate("storyId");

    if (!chapter) {
      throw new Error("Chapter not found");
    }

    return {
      chapterName: chapter.name,
      storyName: chapter.storyId.name,
      storyImage: chapter.storyId.image,
      storyId: chapter.storyId._id,
      chapterNo: chapter.chapterNo,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
export default findHistoryStory;
