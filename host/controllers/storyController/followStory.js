import { storyDAO } from "../../repositories/index.js";
import createError from "http-errors";

const followStory = async (req, res, next) => {
  const { storyId } = req.params;
  const userId = req.user._id;
  
  try {
    const followStory = await storyDAO.createFollow(userId, storyId);

    res.status(201).json(followStory);
  } catch (error) {
    next(
      createError(500, {message : error.message})
    );
  }
};

export default followStory;
