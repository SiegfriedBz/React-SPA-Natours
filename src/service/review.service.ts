import logger from '../utils/logger.utils'
import type { TCreateReviewInput } from '../feature/review/zod/review.zod'

const API_URL = import.meta.env.VITE_API_URL

export async function createReviewOnTour(inputData: TCreateReviewInput) {
  const { content, rating, tour: tourId } = inputData
  try {
    const response = await fetch(`${API_URL}/tours/${tourId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ content, rating })
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(data?.error?.message || `Creating review went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

export async function getAllReviewsOnTour(tourId: string) {
  try {
    const response = await fetch(`${API_URL}/tours/${tourId}/reviews`)
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(
        data?.error?.message ||
          `Fetching reviews for tour #${tourId} went wrong`
      )
    }

    return data
  } catch (error) {
    logger.info(error)
    return { error }
  }
}
