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
      if (key == 'imageCover') {
        if (value instanceof FileList) {
          formData.append('imageCover', value[0])
        }
      }
      if (key === 'images') {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => {
            formData.append('images', file)
          })
        }
      }
      if (
        // Convert objects to JSON strings
        key === 'startLocation' ||
        key === 'locations' ||
        key === 'startDates' ||
        key === 'guides'
      ) {
        formData.append(key, JSON.stringify(value))
      } else if (
        key !== 'imageCover' &&
        key !== 'images' &&
        typeof value === 'object' &&
        value !== null
      ) {
        // Append each property of the object individually
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue instanceof Array) {
            formData.append(`${key}[${subKey}]`, JSON.stringify(subValue))
          } else {
            formData.append(`${key}[${subKey}]`, String(subValue))
          }
        })
      } else if (key !== 'imageCover' && key !== 'images') {
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
      body: formData,
      credentials: 'include'
    })

    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      const errorMessage =
        'tourId' in mutateTourData
          ? `Updating tour #${mutateTourData.tourId}`
          : 'Creating new tour'
      throw new Error(`${errorMessage} went wrong: ${data?.error?.message}`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}

type TGetAllToursProps = {
  queryString?: string
}
export async function getAllTours({ queryString }: TGetAllToursProps = {}) {
  const baseURL = `${API_URL}/tours`
  const url = queryString ? `${baseURL}?${queryString}` : baseURL

  console.log('===== getAllTours ')
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(data?.error?.message || `Fetching tours went wrong`)
    }

    console.log('===== getAllTours data', data)

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
      throw new Error(
        data?.error?.message || `Fetching tour #${tourId} went wrong`
      )
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
      throw new Error(
        data?.error?.message || `Fetching distances to tours went wrong`
      )
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
  latLng: string
  unit: TDistanceUnit
  queryString?: TGetAllToursProps['queryString']
}

export async function getToursWithin({
  distance,
  latLng,
  unit,
  queryString
}: TPropsToursWithin) {
  const baseURL = `${API_URL}/tours/within/${distance}/center/${latLng}/unit/${unit}`
  const url = queryString ? `${baseURL}?${queryString}` : baseURL

  console.log('===== getToursWithin ')
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(
        data?.error?.message || `Fetching tours within distance went wrong`
      )
    }

    console.log('===== getToursWithin data', data)

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
      throw new Error(
        data?.error?.message || `Fetching tours' stats went wrong`
      )
    }

    return data
  } catch (error) {
    logger.info(error)
    return { error }
  }
}

export async function getPlanningStats(year: number) {
  try {
    const response = await fetch(`${API_URL}/tours/monthly-stats/${year}`, {
      credentials: 'include'
    })
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(
        data?.error?.message ||
          `Fetching tours' monthly stats for year ${year} went wrong`
      )
    }

    return data
  } catch (error) {
    logger.info(error)
    return { error }
  }
}
