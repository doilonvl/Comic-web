import errors from 'http-errors';
import RateStory from "../../models/RateStory.js";

export default async function getRateByUserAndStory(userId, storyId) {
  try {
    const rate = await RateStory.findOne({
      userId: userId,
      storyId: storyId 
    });

    return rate;
  } catch (error) {
    console.error("Error fetching rating:", error);
    throw new errors.InternalServerError('Cannot fetch rate for this story');
  }
}
