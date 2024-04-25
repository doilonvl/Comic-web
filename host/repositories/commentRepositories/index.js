import getAllComments from "./getAllComments.js"
import getCommentById from './getCommentById.js'
import getCommentsByStoryId from './getCommentsByStoryId.js'
import getCommentsByUserId from './getCommentsByUserId.js'
import createComment from './createComment.js'
import updateCommentById from './updateCommentById.js'
import deleteCommentById from './deleteCommentById.js'

export default {
  getAllComments, getCommentsByStoryId, getCommentsByUserId, getCommentById, createComment, deleteCommentById, updateCommentById
}