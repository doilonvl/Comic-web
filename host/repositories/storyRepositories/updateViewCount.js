import Story from "../../models/Story.js";

const updateViewCount = async (storyId) => {
  try {
    const story = await Story.findById(storyId);
    if (!story) {
      throw new Error("Story not found");
    }

    story.viewCount += 1;
    await story.save();
    return story;
  } catch (error) {
    throw new Error("Error updating view count: " + error.message);
  }
};
export default updateViewCount;
