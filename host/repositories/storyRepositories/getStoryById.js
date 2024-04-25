import Story from "../../models/Story.js";

const getStoryById = async (storyId) => {
  try {
    const result = await Story.findOne({ _id: storyId }).populate("uploader");
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getStoryById;
