import storyDAO from "../../repositories/storyRepositories/index.js";

const getStoryUpdated = async (req, res, next) => {
  try {
    const result = await storyDAO.getStoryUpdated();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default getStoryUpdated;
