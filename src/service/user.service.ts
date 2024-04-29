import logger from '../utils/logger.utils'
import type {
  TSignupInput,
  TForgotMyPasswordInput,
  TResetMyPasswordInput,
  TUpdateMeInput,
  TUpdateMyPasswordInput
} from '../feature/user/zod/user.zodSchema'

const API_URL = import.meta.env.VITE_API_URL

export async function getMe() {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Getting user profile went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

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

export async function updateMe(mutateUserData: TUpdateMeInput) {
  try {
    // Prepare form data as multipart formdata
    const formData = new FormData()
    Object.entries(mutateUserData).forEach(([key, value]) => {
      if (key === 'photo' && value instanceof FileList) {
        // If the value is a FileList (from an input type="file"), append the first file
        formData.append(key, value[0])
      } else {
        // Convert other non-string values to string
        formData.append(key, String(value))
      }
    })

    const response = await fetch(`${API_URL}/users/update-me`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Profile update went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

export async function updateMyPassword(mutateUserData: TUpdateMyPasswordInput) {
  try {
    const response = await fetch(`${API_URL}/users/update-my-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(mutateUserData)
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Password update went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

export async function deleteMe() {
  try {
    const response = await fetch(`${API_URL}/users/delete-me`, {
      method: 'PATCH',
      credentials: 'include'
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Password update went wrong`)
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
