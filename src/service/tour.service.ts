import logger from '../utils/logger.utils'
import type {
  TCreateTourInput,
  TUpdateTourInput
} from '../feature/tour/zod/tour.zodSchema'

const API_URL = import.meta.env.VITE_API_URL

/**
 * Mutates a tour by sending a request to the API.
 * @param mutateTourData - The data to be mutated. It can be either TCreateTourInput or TUpdateTourInput.
 * @returns A Promise that resolves to the response data from the API.
 * @throws If an error occurs during the mutation process.
 */
export async function mutateTour(
  mutateTourData: TCreateTourInput | TUpdateTourInput
) {
  try {
    // Prepare form data as multipart formdata
    const formData = new FormData()
    Object.entries(mutateTourData).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // Convert object to string
        formData.append(key, JSON.stringify(value))
      } else if (key !== '_id') {
        // Convert other non-string values to string
        formData.append(key, String(value))
      }
    })

    const url =
      '_id' in mutateTourData
        ? `${API_URL}/tours/${mutateTourData?._id}`
        : `${API_URL}/tours`

    const method = '_id' in mutateTourData ? 'PATCH' : 'POST'

    const response = await fetch(url, {
      method,
      body: formData
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      const errorMessage =
        '_id' in mutateTourData
          ? `Updating tour #${mutateTourData?._id}`
          : 'Creating new tour'
      throw new Error(`${errorMessage} went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

export async function getAllTours() {
  try {
    const response = await fetch(`${API_URL}/tours`)
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Fetching tours went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    return { error }
  }
}

export async function getTour(id: string) {
  try {
    const response = await fetch(`${API_URL}/tours/${id}`)
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Fetching tour #${id} went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    return { error }
  }
}

export async function getStats() {
  try {
    const response = await fetch(`${API_URL}/tours/stats`)
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Fetching tours' stats went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    return { error }
  }
}

export async function getMonthlyStats(year: number) {
  try {
    const response = await fetch(`${API_URL}/tours//monthly-stats/${year}`)
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(
        `Fetching tours' monthly stats for year ${year} went wrong`
      )
    }

    return data
  } catch (error) {
    logger.info(error)
    return { error }
  }
}