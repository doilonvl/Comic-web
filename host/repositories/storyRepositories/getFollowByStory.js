import FollowStory from '../../models/FollowStory.js';

const getFollowByStory = async (storyId) => { 
  return await FollowStory.find({ storyId: storyId }); 
};

export default getFollowByStory;