import { storyDAO } from "../../repositories/index.js";

const updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = req.body;
    const result = await storyDAO.updateStory(id, story);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default updateStory;
