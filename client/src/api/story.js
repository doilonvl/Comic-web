export async function fetchStoryById(id) {
  try {
    const response = await fetch(`http://localhost:9999/story/get_story/${id}`)
    const story = await response.json()
    return story
  } catch (error) {
    throw error
  }
}

export async function fetchCategoriesByStoryId(storyId) {
  try {
    const response = await fetch(`http://localhost:9999/story_categories/getCategoriesBystoryId/${storyId}`)
    const story = await response.json()
    return story
  } catch (error) {
    throw error
  }
}