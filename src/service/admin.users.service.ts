import logger from '../utils/logger.utils'

const API_URL = import.meta.env.VITE_API_URL

type TProps = {
  query?: string
}
export async function getUsers({ query }: TProps) {
  try {
    const url = query ? `${API_URL}/users/?${query}` : `${API_URL}/users`

    const response = await fetch(`${url}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(data?.error?.message || `Getting user profile went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}
