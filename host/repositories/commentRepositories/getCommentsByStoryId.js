import Comments from '../../models/Comments.js';

export default async function getCommentsByStoryId(storyId, page = 1, limit = 5) {
  try {
    // Calculate the starting index
    const startIndex = (page - 1) * limit;
    const total = await Comments.countDocuments({ storyId });

    // Retrieve a subset of comments based on the current page and limit
    // and sort them from latest to oldest
    const comments = await Comments.find({ storyId })
      .populate({
        path: 'userId',
        select: 'userName img'
      })
      .sort({ createdAt: -1 })  // Sort by createdAt field in descending order
      .skip(startIndex)
      .limit(limit);

    // Return the paginated result along with total pages information
    return {
      comments,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalComments: total
    };

  } catch (error) {
    console.error('Error fetching paginated comments:', error);
    throw error;
  }
}
