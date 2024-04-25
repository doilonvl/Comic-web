import Story from "../../models/Story.js";

const getStoryUpdated = async (chapterId) => {
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
            { $limit: 1 },
          ],
          as: "chapters",
        },
      },
    ];
    return await Story.aggregate(pipeline).limit(10);
  } catch (error) {
    throw new Error(error.message);
  }
};
export default getStoryUpdated;
