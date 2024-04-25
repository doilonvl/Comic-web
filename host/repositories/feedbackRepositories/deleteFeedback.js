import Feedback from "../../models/Feedback.js";

const deleteFeedback = async (fid) => {
  try {
    return await Feedback.findOneAndDelete({ _id: fid }).exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteFeedback;
