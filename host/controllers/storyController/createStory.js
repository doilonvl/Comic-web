import { storyDAO } from "../../repositories/index.js";

const createStory = async (req, res) => {
  try {
    const newStory = await storyDAO.createStory(req.body);
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default createStory;
