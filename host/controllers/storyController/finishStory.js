import { storyDAO } from "../../repositories/index.js";

const finished = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(201).json(await storyDAO.finishStory(id));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default finished;
