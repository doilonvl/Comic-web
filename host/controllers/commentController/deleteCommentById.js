import { commentDAO } from '../../repositories/index.js'

export default async function deleteCommentById(req, res, next){
  try {
    const id = req.params.id
    //check if id exist in comments
    const response = await commentDAO.deleteCommentById(id)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}