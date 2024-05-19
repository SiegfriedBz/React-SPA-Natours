import { type QueryObserverResult, useQuery } from '@tanstack/react-query'
import { getTour } from '../../../service/tour.service'
import type { TTour } from '../../../types/tour.types'

type TProps = {
  tourId: string
}

type TReturn = {
  data: { data: { tour: TTour | undefined } | undefined } | undefined
  refetch: () => Promise<QueryObserverResult<TTour, Error>>
  isError: boolean
  isLoading: boolean
  isPending: boolean
}

export function useGetTour({ tourId }: TProps): TReturn {
  const { data, refetch, isError, isLoading, isPending } = useQuery({
    queryKey: ['tour', tourId],
    queryFn: () => getTour(tourId)
  })

  return { data, refetch, isError, isLoading, isPending }
}
