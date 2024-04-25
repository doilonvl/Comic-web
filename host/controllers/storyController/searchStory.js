import storyDAO from "../../repositories/storyRepositories/index.js";

const searchStory = async (req, res, next) => {
  try {
    const { search } = req.params;
    res.send(await storyDAO.searchStory(search));
  } catch (error) {
    next(error);
  }
};
export default searchStory;
