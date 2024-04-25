import { categoryDAO } from "../../repositories/index.js"

export default async function createCategory(req, res, next) {
  try {
    const newCategory = req.body
    const response = await categoryDAO.createCategory(newCategory)
    res.status(201).json(response)
  } catch (error) {
    console.log(error)
  }
}