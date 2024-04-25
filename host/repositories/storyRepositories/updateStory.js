import Story from "../../models/Story.js";
import StoryCategories from "../../models/StoryCategory.js";

const updateStory = async (id, story) => {
  try {
    const result = await Story.findByIdAndUpdate(id, story);
    const { categories } = story;
    const storyCategories = categories.map((c, i) => ({
      storyId: id,
      categoryId: c.value,
      name: i + "",
    }));
    await StoryCategories.deleteMany({ storyId: id });
    await StoryCategories.insertMany(storyCategories);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateStory;
