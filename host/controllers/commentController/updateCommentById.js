import { commentDAO } from '../../repositories/index.js'

export default async function updateCommentById(req, res, next) {
  try {
    const id = req.params.id
    //find old comment
    const existComment = await commentDAO.getCommentById(id)
    if (!existComment) {
      res.status(404).json(updateComment)
    }
    const newComment = {
      ...existComment._doc,
      ...req.body
    }
    const updateComment = await commentDAO.updateCommentById(id, newComment)
    res.status(200).json(updateComment)
  } catch (error) {
    console.log(error)
  }
}