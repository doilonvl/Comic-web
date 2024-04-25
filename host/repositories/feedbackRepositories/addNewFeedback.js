import Feedback from "../../models/Feedback.js";

const addNewFeedback = async (feedback) => {
  try {
    return await Feedback.create(feedback);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addNewFeedback;
