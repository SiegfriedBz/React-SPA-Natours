import logger from '../utils/logger.utils'

const API_URL = import.meta.env.VITE_API_URL

export async function getMyBookings() {
  try {
    const response = await fetch(`${API_URL}/users/my-bookings`, {
      credentials: 'include'
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(data?.error?.message || `Fetching bookings went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    return { error }
  }
}
