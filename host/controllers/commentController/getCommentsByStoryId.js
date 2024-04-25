import { commentDAO } from '../../repositories/index.js';

export default async function getCommentsByStoryId(req, res, next) {
  try {
    const storyId = req.params.id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 5) || 5; // Default limit to 10 or any other value you prefer

    const comments = await commentDAO.getCommentsByStoryId(storyId, page, limit);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
}
