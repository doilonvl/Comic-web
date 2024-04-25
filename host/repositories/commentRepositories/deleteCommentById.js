import Comments from '../../models/Comments.js'

export default async function deleteCommentById(id){
  try {
    return await Comments.findByIdAndDelete(id)
  } catch (error) {
    console.log(error)
  }
}