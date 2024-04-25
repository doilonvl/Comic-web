import Comments from '../../models/Comments.js'

export default async function getAllComments() {
  try {
    return await Comments.find({})
  } catch (error) {
    console.log(error)
  }
}