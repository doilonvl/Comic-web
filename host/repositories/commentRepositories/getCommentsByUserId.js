import Comments from '../../models/Comments.js'

export default async function getCommentsByUserId(userId) {
  try {
    return await Comments.find({userId})
  } catch (error) {
    console.log(error)
  }
}