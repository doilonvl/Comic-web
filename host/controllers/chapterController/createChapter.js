import ChapterContent from "../../models/ChapterContent.js";
import chapterDAO from "../../repositories/chapterRepositories/index.js";

const createChapter = async (req, res) => {
  try {
    const { storyId, name, isActive } = req.body;
    const chapter = await chapterDAO.createChapter({ storyId, name, isActive });

    const chapterContent = new ChapterContent({
      chapterId: chapter._id,
      paragraphs: [],
    });

    await chapterContent.save();

    res.status(201).json({ chapter, chapterContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default createChapter;
