import Feedback from "../../models/Feedback.js";

const filterFeedback = async (storyId, limit, skip) => {
  try {
    const quantity = await Feedback.countDocuments({ storyId });
    const result = await Feedback.find({ storyId })
      .populate("userId")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    return { data: result, count: quantity };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default filterFeedback;
