import { commentDAO, userDAO, storyDAO } from '../../repositories/index.js'

export default async function createComment(req, res, next) {
  try {
    /*validate input*/
    const { userId, storyId } = req.body
    //check if userId exist
    const userInDatabase = await userDAO.getUserById(userId)
    if(!userInDatabase){
      console.log('This user is not exist')
    }
    //check if storyId exist
    const storyInDatabase = await storyDAO.getStoryById(storyId)
    if(!storyInDatabase){
      console.log('This story is not exist')
    }
    /******/

    const comment = req.body
    const response = await commentDAO.createComment(comment)
    res.status(201).json(response)
  } catch (error) {
    console.log(error)
  }
}