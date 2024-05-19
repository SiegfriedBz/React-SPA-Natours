import logger from '../utils/logger.utils'
import type { TLoginInput } from '../feature/auth/zod/auth.zodSchema'

const API_URL = import.meta.env.VITE_API_URL

export async function login(input: TLoginInput) {
  try {
    const response = await fetch(`${API_URL}/sessions/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // => ASK Server to Send Cookies & Set cookies from response
      body: JSON.stringify(input)
    })

    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(data?.error?.message || `Login went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

export async function logout() {
  try {
    const response = await fetch(`${API_URL}/sessions/logout`, {
      method: 'DELETE',
      credentials: 'include' // SEND cookies to Server
    })

    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(data?.error?.message || `Logout went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}
