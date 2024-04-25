import { storyDAO } from "../../repositories/index.js";
const findHistoryStory = async (req, res) => {
  try {
    const { storyId, chapterNo } = req.params;
    const chapterDetail = await storyDAO.findHistoryStory(chapterNo, storyId);
    res.json(chapterDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default findHistoryStory;
