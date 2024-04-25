import Story from "../../models/Story.js";

const searchStory = async (search) => {
  try {
    const story = await Story.aggregate([
      { $match: { isActive: true } },
      { $match: { name: { $regex: search, $options: "i" } } },
      {
        $lookup: {
          from: "chapters",
          localField: "_id",
          foreignField: "storyId",
          as: "chapters",
        },
      },
      {
        $addFields: {
          chapters: {
            $size: {
              $filter: {
                input: "$chapters",
                as: "chapter",
                cond: { $eq: ["$$chapter.isActive", true] },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "storycategories",
          localField: "_id",
          foreignField: "storyId",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories.categoryId",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "uploader",
          foreignField: "_id",
          as: "uploader",
        },
      },
      { $unwind: "$uploader" },
    ]);
    return story;
  } catch (error) {
    throw new Error("Error while finding chapter content: " + error.message);
  }
};
export default searchStory;
