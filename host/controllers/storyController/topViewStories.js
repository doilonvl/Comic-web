import storyRepositories from "../../repositories/storyRepositories/index.js";

const topViewStories = async (req, res, next) => {
  try {
    res.send(await storyRepositories.topViewStories());
  } catch (error) {
    next(error);
  }
};
export default topViewStories;
