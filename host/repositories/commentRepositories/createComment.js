import Comments from '../../models/Comments.js'

export default async function createComment(comment) {
  try {
    const newComment = await Comments.create(comment)
    return newComment._doc
  } catch (error) {
    console.log(error)
  }
}