import createHttpError from "http-errors";
import Story from "../../models/Story.js";

const getActivatedStories = async () => {
  try {
    const activeStories = await Story.find({ isActive: true })
      .populate("uploader", "userName")
      .exec();
    return activeStories;
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};
export default getActivatedStories;
