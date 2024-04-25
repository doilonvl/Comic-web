import storyRepositories from "../../repositories/storyRepositories/index.js";

const getStoryById = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const result = await storyRepositories.getStoryById(storyId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default getStoryById;
