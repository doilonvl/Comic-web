export async function fetchUserByToken(token) {
  try {
    const response = await fetch('http://localhost:9999/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const user = response.json()
  return user
  } catch (error) {
    throw error
  }
}