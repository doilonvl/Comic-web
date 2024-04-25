import feedbackRepositories from "../../repositories/feedbackRepositories/index.js";

const addNewFeedback = async (req, res, next) => {
  try {
    const { userId, storyId, feedback, status } = req.body;
    res.status(200).json(
      await feedbackRepositories.addNewFeedback({
        userId,
        storyId,
        feedback,
        status,
      })
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default addNewFeedback;
