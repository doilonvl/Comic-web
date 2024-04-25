import { storyDAO } from "../../repositories/index.js";

const getAllChapter = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    if (!storyId) {
      return res.status(400).json({ message: "Story ID is required" });
    }

    const chapters = await storyDAO.getAllChapter(storyId);
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default getAllChapter;
