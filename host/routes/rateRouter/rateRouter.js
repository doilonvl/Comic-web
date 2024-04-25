import express from 'express'
import { rateController } from '../../controllers/index.js'
import RateStory from '../../models/RateStory.js'
const router = express.Router()
router.route('/').get(rateController.getRate).post(rateController.createRate)
router.route('/general/:id').get(async (req, res, next) => {
  try {
    const storyId = req.params.id
    const response = await RateStory.find({ storyId })
    const rates = response.map(rate => rate.rateNo)
    console.log(rates)
    const count = rates.length
    const sum = rates.reduce((accumulator, currentValue)=>accumulator + currentValue, 0)
    const average = (sum / count).toFixed(1)
    res.send({
      count, average
    })
  } catch (error) {
    next(error)
  }
})

export default router