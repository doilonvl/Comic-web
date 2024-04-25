export async function fetchListCommentByUserId(userId, page) {
  try {
    const response = await fetch(`http://localhost:9999/comment/list/${userId}?page=${page}&limit=5`)
    return response.json()
  } catch (error) {
    throw error
  }
}

export async function fetchPageByCommentId(commentId) {
  try {
    const response = await fetch(`http://localhost:9999/comment/getPage/${commentId}`)
    return response.json()
  } catch (error) {
    throw error
  }
}