import { rateDAO } from '../../repositories/index.js'

export default async function createRate(req, res, next) {
  try {
    const rate = req.body
    const response = await rateDAO.createRate(rate)
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}