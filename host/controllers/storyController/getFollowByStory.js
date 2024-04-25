import { storyDAO } from "../../repositories/index.js";

const getFollowByStory = async (req, res, next) => {
  try {
    const followList = await storyDAO.getFollowByStory(req.params.storyId); 

    if (!followList) {
      return res.status(404).json({ message: "No follow data found for this story." });
    }

    res.status(200).json(followList);
  } catch (error) {
    next(error);
  }
};

export default getFollowByStory;

