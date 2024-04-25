export async function fetchRateInfo(storyId) {
  try {
    const response = await fetch(`http://localhost:9999/rate/general/${storyId}`)
    const info = await response.json()
    return info
  } catch (error) {
    throw error
  }
}