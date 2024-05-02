import { useQuery } from '@tanstack/react-query'
import {
  getAllTours,
  getTour,
  getToursWithin
} from '../../../service/tour.service'
import type { TDistanceUnit } from '../components/DistancesToToursForm'

type TProps = {
  tourId?: string
  latLng?: string
  distance?: string
  unit?: TDistanceUnit
}

export function useTour({ tourId, latLng, distance, unit }: TProps = {}) {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: [
        'tours',
        `tours-${tourId}`,
        `tours-${latLng}-${distance}-${unit}`
      ],
      queryFn: () => {
        return tourId
          ? getTour(tourId)
          : latLng && distance && unit
            ? getToursWithin({ latLng, distance: distance, unit })
            : getAllTours()
      }
    })

  return { data, refetch, status, isPending, isSuccess, isError, isLoading }
}
