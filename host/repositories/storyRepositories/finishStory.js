import Story from "../../models/Story.js";

const finishStory = async (id) => {
  try {
    return await Story.findByIdAndUpdate(id, {
      $set: { status: "finished" },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
export default finishStory;
