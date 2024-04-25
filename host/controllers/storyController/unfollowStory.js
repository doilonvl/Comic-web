import createError from "http-errors";
import { storyDAO } from "../../repositories/index.js";

const unfollowStory = async (req, res, next) => {
  const { storyId } = req.params;
  const userId = req.user._id;
  
  try {
    await storyDAO.deleteFollow(userId, storyId);

    res.status(200).json({ message: "Unfollowed the story successfully." });
  } catch (error) {
    next(
      createError(500, {message : error.message})
    );
  }
};

export default unfollowStory;
