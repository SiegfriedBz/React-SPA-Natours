import logger from '../utils/logger.utils'
import type {
  TSignupInput,
  TForgotMyPasswordInput,
  TResetMyPasswordInput
} from '../feature/user/zod/user.zodSchema'

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

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Signup went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

export async function forgotMyPassword({ email }: TForgotMyPasswordInput) {
  try {
    const response = await fetch(`${API_URL}/users/forgot-my-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Password reset went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

export async function resetMyPassword({
  password,
  passwordConfirmation,
  resetPasswordToken
}: TResetMyPasswordInput) {
  try {
    const response = await fetch(`${API_URL}/users/reset-my-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        passwordConfirmation,
        resetPasswordToken
      })
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Password reset went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}
