import feedbackDAO from "../../repositories/feedbackRepositories/index.js";

const deleteFeedback = async (req, res, next) => {
  try {
    const { fid } = req.params;
    const result = await feedbackDAO.deleteFeedback(fid);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export default deleteFeedback;
