import createHttpError from "http-errors";
import { storyDAO } from "../../repositories/index.js";

const changeStoryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedStory = await storyDAO.changeStoryStatus(
      id,
      status === "active"
    );
    res.status(200).json(updatedStory);
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export default changeStoryStatus;
