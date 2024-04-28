import logger from '../utils/logger.utils'
import type {
  TCreateTourInput,
  TUpdateTourInput
} from '../feature/tour/zod/tour.zodSchema'
import type { TDistanceUnit } from '../types/tour.types'

const API_URL = import.meta.env.VITE_API_URL

/**
 * Mutates a tour by sending a request to the API.
 * @param mutateTourData - The data to be mutated. It can be either TCreateTourInput or TUpdateTourInput.
 * @returns A Promise that resolves to the response data from the API.
 * @throws If an error occurs during the mutation process.
 */
export async function mutateTour(
  mutateTourData: TCreateTourInput | (TUpdateTourInput & { tourId: string })
) {
  try {
    // Prepare form data as multipart formdata
    const formData = new FormData()
    Object.entries(mutateTourData).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // Convert object to string
        formData.append(key, JSON.stringify(value))
      } else {
        // Convert other non-string values to string
        formData.append(key, String(value))
      }
    })

    const url =
      'tourId' in mutateTourData
        ? `${API_URL}/tours/${mutateTourData.tourId}`
        : `${API_URL}/tours`

    const method = 'tourId' in mutateTourData ? 'PATCH' : 'POST'

    const response = await fetch(url, {
      method,
      body: formData
    })

    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      const errorMessage =
        'tourId' in mutateTourData
          ? `Updating tour #${mutateTourData.tourId}`
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

export async function getTour(tourId: string) {
  try {
    const response = await fetch(`${API_URL}/tours/${tourId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Fetching tour #${tourId} went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    return { error }
  }
}

/** Geo */
export type TPropsGetDistances = {
  latLng: string
  unit: TDistanceUnit
}
export type TDistance = { distance: number; name: string; _id: string }
export async function getDistancesToTours(
  { latLng, unit }: TPropsGetDistances = { latLng: '8.64,115.1', unit: 'mi' }
): Promise<TDistance[]> {
  try {
    const response = await fetch(
      `${API_URL}/tours/distances-from/${latLng}/unit/${unit}`
    )
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Fetching distances to tours went wrong`)
    }

    const distances: TDistance[] = data?.data?.distances

    return distances
  } catch (error) {
    logger.info(error)
    throw error
  }
}

export type TPropsToursWithin = {
  distance: string
} & TPropsGetDistances
export async function getToursWithin({
  distance,
  latLng,
  unit
}: TPropsToursWithin) {
  console.log('==== getToursWithin')
  try {
    const response = await fetch(
      `${API_URL}/tours/within/${distance}/center/${latLng}/unit/${unit}`
    )
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Fetching tours within distance went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

/** Stats */
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
    const response = await fetch(`${API_URL}/tours/monthly-stats/${year}`, {
      credentials: 'include'
    })
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
