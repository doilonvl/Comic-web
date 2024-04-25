import createError from "http-errors";
import { storyDAO } from "../../repositories/index.js";

const getActivatedStories = async (req, res, next) => {
  try {
    const activeStories = await storyDAO.getActivatedStories();
    res.json(activeStories);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export default getActivatedStories;
