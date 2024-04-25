import Comment from "../../models/Comments.js"

export default async function getCommentById(id){
  try {
    return await Comment.findById(id)
  } catch (error) {
    console.log(error)
  }
}