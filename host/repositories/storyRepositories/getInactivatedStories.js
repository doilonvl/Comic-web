import createHttpError from "http-errors";
import Story from "../../models/Story.js";

const getInactivatedStories = async () => {
  try {
    const inactiveStories = await Story.find({ isActive: false })
      .populate("uploader")
      .exec();
    return inactiveStories;
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};
export default getInactivatedStories;
