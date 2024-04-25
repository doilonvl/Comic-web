import { storyDAO } from "../../repositories/index.js";

const getChapterContent = async (req, res) => {
  try {
    const { chapterId } = req.params;
    if (!chapterId) {
      return res.status(400).json({ message: "Chapter ID is required" });
    }

    const content = await storyDAO.getStoryDetail(chapterId);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getChapterContent;
