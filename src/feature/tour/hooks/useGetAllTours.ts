import { useSearchParams } from 'react-router-dom'
import {
  QueryObserverResult,
  RefetchOptions,
  useQueries
} from '@tanstack/react-query'
import { getAllTours, getToursWithin } from '../../../service/tour.service'
import type { TDistanceUnitOption } from '../components/forms/searchForms/distanceUnitOptions'
import type { TTour } from '../../../types/tour.types'

type TQuery = {
  queryKey: string[]
  queryFn: () => Promise<{
    data: { tours: TTour[] }
    dataCount: number
    status: string
  }>
}

type TQueryResult = {
  data: { tours: TTour[] } | undefined
  dataCount: number | undefined
  status: 'error' | 'success' | 'pending'
  isLoading: boolean
  isError: boolean
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<
      { data: { tours: TTour[] }; dataCount: number; status: string },
      Error
    >
  >
}

type TUseGetAllToursResult = {
  currentPageResult: TQueryResult
  nextPageResult: TQueryResult
}

/**
 * Custom hook to fetch all tours based on search parameters.
 * @returns An object containing the results for the current page and the next page.
 */
export function useGetAllTours(): TUseGetAllToursResult {
  const [searchParams] = useSearchParams()
  let queries: TQuery[] = []

  /** 1. Extract all params excluding lat, lng, distance, unit
   *   and generate query STRINGS for current and next page.
   */
  const currentPageNumStr = searchParams.get('page') || '1'
  const nextPageNumStr = String(+currentPageNumStr + 1)
  // 1.1 for CURRENT page
  const currentPageQueryString = getQueryString({
    pageNum: currentPageNumStr,
    searchParams
  })
  // 1.2 for NEXT page
  const nextPageQueryString = getQueryString({
    pageNum: nextPageNumStr,
    searchParams
  })

  /** 2. Extract lat, lng, distance, unit params
   *   and get query OBJECT for these params.
   */
  const { latLng, distance, unit } = getWithinDistanceQueryObject(searchParams)

  /** 3. Set queries if NO latLng distance unit in params
   *  => getAllTours
   */
  if (!latLng || !distance || !unit) {
    queries = [
      {
        queryKey: ['tours', `${currentPageQueryString}`],
        queryFn: () => getAllTours({ queryString: currentPageQueryString })
      },
      {
        queryKey: ['tours', `${nextPageQueryString}`],
        queryFn: () => getAllTours({ queryString: nextPageQueryString })
      }
    ]
  }

  /** 4. Set queries if latLng distance unit in params
   *  => getToursWithin
   */
  if (latLng && distance && unit) {
    queries = [
      {
        queryKey: [
          'tours',
          `${currentPageQueryString}`,
          `${latLng}-${distance}-${unit}`
        ],
        queryFn: () =>
          getToursWithin({
            latLng,
            distance,
            unit,
            queryString: currentPageQueryString // page=1...
          })
      },
      {
        queryKey: [
          'tours',
          `${nextPageQueryString}`,
          `${latLng}-${distance}-${unit}`
        ],
        queryFn: () =>
          getToursWithin({
            latLng,
            distance,
            unit,
            queryString: nextPageQueryString // page=2...
          })
      }
    ]
  }

  /** 5. Fetch data */
  const results = useQueries({
    queries: queries
  }).map(({ data, status, isLoading, isError, refetch }) => ({
    data: data?.data,
    dataCount: data?.dataCount,
    status: status,
    isLoading: isLoading,
    isError: isError,
    refetch: refetch
  }))

  const currentPageResult = results[0]
  const nextPageResult = results[1]

  return { currentPageResult, nextPageResult }
}

/** Helpers */
/**
 * Constructs a query object with latitude, longitude, distance, and unit based on the provided search parameters.
 * @param searchParams - The URLSearchParams object containing the search parameters.
 * @returns An object containing the latitude, longitude, distance, and unit.
 */
const getWithinDistanceQueryObject = (searchParams: URLSearchParams) => {
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const latLng = lat && lng ? `${lat},${lng}` : ''
  const distance = searchParams.get('distance')
  const unit = searchParams.get('unit') as TDistanceUnitOption['value']

  return { latLng, distance, unit }
}

/**
 * Generates a query string based on the provided page number and search parameters.
 *
 * @param {Object} options - The options object.
 * @param {string} options.pageNum - The page number.
 * @param {URLSearchParams} options.searchParams - The search parameters.
 * @returns {string} The generated query string.
 */
const getQueryString = ({
  pageNum,
  searchParams
}: {
  pageNum: string
  searchParams: URLSearchParams
}) => {
  const queryParams = Object.fromEntries(
    Array.from(searchParams.entries()).filter(
      ([key]) =>
        key !== 'lat' && key !== 'lng' && key !== 'distance' && key !== 'unit'
    )
  )

  queryParams.page = pageNum

  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  return queryString
}
