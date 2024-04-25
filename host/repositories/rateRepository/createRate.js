import errors from 'http-errors';
import RateStory from "../../models/RateStory.js";

export default async function createRate(rate) {
  try {
    const { userId, storyId, rateNo } = rate
    const existRate = await RateStory.find({ userId, storyId })
    console.log(existRate)
    if (existRate.length > 0) {
      const id = existRate[0]._id
      return await RateStory.findByIdAndUpdate(
        { _id: id }, { ...existRate, rateNo }, { new: true }
      )
    }
    console.log('here')
    return await RateStory.create(rate)
  } catch (error) {
    console.error('Error in createRate:', error);
    throw new errors.InternalServerError('Cannot process rate');
  }
}
