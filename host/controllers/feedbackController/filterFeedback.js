import feedbackDAO from "../../repositories/feedbackRepositories/index.js";

const filterFeedback = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const { limit, skip } = req.query;
    const result = await feedbackDAO.filterFeedback(storyId, limit, skip);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export default filterFeedback;
