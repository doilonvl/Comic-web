import FollowStory from '../../models/FollowStory.js';

const deleteFollow = async (userId, storyId) => {
    const follow = await FollowStory.findOne({ userId: userId, storyId: storyId });
    if (!follow) {
        throw new Error('You are not following this story');
    }
    
    return await FollowStory.deleteOne({ userId: userId, storyId: storyId });
};

export default deleteFollow;