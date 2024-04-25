import FollowStory from "../../models/FollowStory.js";
import Chapter from "../../models/Chapter.js";

const getFollowList = async (userId) => {
  const followList = await FollowStory.find({ userId: userId }).populate(
    "storyId"
  );

  const followListWithLatestChapter = await Promise.all(
    followList.map(async (followStory) => {
      const latestChapter = await Chapter.findOne({
        storyId: followStory.storyId._id,
      }).sort({ publishedDate: -1 });
      return {
        ...followStory._doc,
        latestChapter,
        publishedDate: latestChapter?.publishedDate,
      };
    })
  );

  return followListWithLatestChapter;
};

export default getFollowList;
