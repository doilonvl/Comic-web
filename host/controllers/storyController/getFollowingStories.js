import { storyDAO } from "../../repositories/index.js";

const getFollowingStories = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const followList = await storyDAO.getFollowList(userId);

    res.status(200).json(followList);
  } catch (error) {
    next(
      createError(500, {message : error.message})
    );
  }
};

export default getFollowingStories;