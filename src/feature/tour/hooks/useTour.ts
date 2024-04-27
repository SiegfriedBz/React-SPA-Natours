import { useQuery } from '@tanstack/react-query'
import { getAllTours, getTour } from '../../../service/tour.service'

type TProps = { tourId?: string }

export function useTour({ tourId }: TProps = {}) {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: ['tours'],
      queryFn: () => {
        return tourId ? getTour(tourId) : getAllTours()
      }
    })

  return { status, isPending, isSuccess, isError, isLoading, data, refetch }
}
