import Story from "../../models/Story.js";

const activeStory = async (id) => {
  try {
    return await Story.findByIdAndUpdate(id, {
      $set: { isActive: true },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
export default activeStory;
