import mongoose from "mongoose";
import Story from "../../models/Story.js";

const getStoriesByUser = async (userId) => {
  try {
    const result = await Story.aggregate([
      { $match: { uploader: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "storycategories",
          localField: "_id",
          foreignField: "storyId",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category.categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
    ]);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getStoriesByUser;
