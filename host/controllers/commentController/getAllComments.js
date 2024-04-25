import { commentDAO } from '../../repositories/index.js'

export default async function getAllComments(req, res, next){
  try {
    const comments = await commentDAO.getAllComments()
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
  }
}