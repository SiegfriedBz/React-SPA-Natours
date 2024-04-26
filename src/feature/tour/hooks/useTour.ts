import { useQuery } from '@tanstack/react-query'
import { getAllTours, getTour } from '../../../service/tour.service'

type TProps = { id?: string }

export function useTour({ id }: TProps = {}) {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: ['tours'],
      queryFn: () => {
        return id ? getTour(id) : getAllTours()
      }
    })

  return { status, isPending, isSuccess, isError, isLoading, data, refetch }
}
