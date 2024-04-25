import FollowStory from '../../models/FollowStory.js';

const createFollow = async (userId, storyId) => {
    const followStory = new FollowStory({
        userId: userId,
        storyId: storyId,
    });

    try {
        return await followStory.save();
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('You are already following this story');
        }
        throw error;
    }
};
export default createFollow;