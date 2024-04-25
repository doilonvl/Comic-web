import ChapterContent from "../../models/ChapterContent.js";

const getStoryDetail = async (chapterId) => {
  try {
    const chapterContent = await ChapterContent.findOne({ chapterId }).populate(
      "chapterId"
    );
    return chapterContent;
  } catch (error) {
    throw new Error("Error while finding chapter content: " + error.message);
  }
};
export default getStoryDetail;
