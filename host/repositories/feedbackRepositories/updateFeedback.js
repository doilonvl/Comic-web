import Feedback from "../../models/Feedback.js";

const updateFeedback = async (fid, updatedValue) => {
  try {
    return await Feedback.findByIdAndUpdate(
      fid,
      { $set: updatedValue },
      { new: true }
    ).exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateFeedback;
