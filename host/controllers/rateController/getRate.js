import { rateDAO } from '../../repositories/index.js'

export default async function getRate(req, res, next){
  try {
    const userId = req.query.userId
    const storyId = req.query.storyId
    const response = await rateDAO.getRateByUserAndStory(userId, storyId)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}