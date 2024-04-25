import feedbackDAO from "../../repositories/feedbackRepositories/index.js";

const updateFeedback = async (req, res, next) => {
  try {
    const { fid } = req.params;
    const updatedFields = req.body;
    const result = await feedbackDAO.updateFeedback(fid, updatedFields);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export default updateFeedback;
