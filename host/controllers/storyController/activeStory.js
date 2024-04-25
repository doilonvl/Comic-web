import { storyDAO } from "../../repositories/index.js";

const activeStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(201).json(await storyDAO.activeStory(id));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default activeStory;
