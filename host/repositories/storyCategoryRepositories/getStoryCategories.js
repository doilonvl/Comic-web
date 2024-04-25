import StoryCategories from "../../models/StoryCategory.js";

const getStoryCategories = async (sid) => {
  try {
    return await StoryCategories.find({ storyId: sid }).populate("categoryId");
  } catch (error) {
    throw new Error(error.message);
  }
};
export default getStoryCategories;
