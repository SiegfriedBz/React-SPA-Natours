import logger from '../utils/logger.utils'
import type { TSignupInput } from '../feature/user/zod/user.zodSchema'

const API_URL = import.meta.env.VITE_API_URL

export async function signup(inputSignup: TSignupInput) {
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputSignup)
    })
    const data = await response.json()

    const success = data.status === 'success'
    if (!success) {
      // NOTIFY USER
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}
