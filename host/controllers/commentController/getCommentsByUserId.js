import { commentDAO } from '../../repositories/index.js'

export default async function getCommentsByUserId(req, res, next){
  try {
    const userId = req.params.id
    const comments = await commentDAO.getCommentsByUserId(userId)
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
  }
}