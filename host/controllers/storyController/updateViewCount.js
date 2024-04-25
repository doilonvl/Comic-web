import { storyDAO } from "../../repositories/index.js";

const updateViewCount = async (req, res) => {
  try {
    const updatedStory = await storyDAO.updateViewCount(req.params.id);
    res.status(200).json({ message: "View count updated", data: updatedStory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default updateViewCount;
