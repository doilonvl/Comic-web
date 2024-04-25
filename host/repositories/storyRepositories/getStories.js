import mongoose from "mongoose";
import Story from "../../models/Story.js";

const getStories = async ({ status, categoryId }) => {
  try {
    const pipeline = [
      { $match: { isActive: true } },
      {
        $lookup: {
          from: "chapters",
          let: { storyId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$storyId", "$storyId"] },
                    { $eq: ["$isActive", true] },
                  ],
                },
              },
            },
            { $sort: { publishedDate: -1 } },
            { $limit: 3 },
          ],
          as: "chapters",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "storyId",
          as: "comment",
        },
      },
      {
        $lookup: {
          from: "followstories",
          localField: "_id",
          foreignField: "storyId",
          as: "followQtt",
        },
      },
      {
        $addFields: {
          comment: { $size: "$comment" },
          followQtt: { $size: "$followQtt" },
          chapterQtt: { $size: "$chapters" },
        },
      },
      { $sort: { "chapters.publishedDate": -1 } },
      { $sort: { updatedAt: -1 } },
      // {
      //   $addFields: {
      //     chapters: { $slice: ["$chapters", 3] },
      //   },
      // },
    ];
    if (status !== undefined && status.length > 0) {
      pipeline[0].$match.status = status;
    }

    if (categoryId !== undefined && categoryId.length > 0) {
      pipeline.push({
        $lookup: {
          from: "storycategories",
          localField: "_id",
          foreignField: "storyId",
          as: "category",
        },
      });
      pipeline.push({
        $match: {
          "category.categoryId": new mongoose.Types.ObjectId(categoryId),
        },
      });
    }
    const result = await Story.aggregate(pipeline);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getStories;
