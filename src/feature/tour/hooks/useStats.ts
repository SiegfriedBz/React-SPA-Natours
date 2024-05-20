import { useQuery } from '@tanstack/react-query'
import { getStats, getPlanningStats } from '../../../service/tour.service'

export function useStats() {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: ['stats'],
      queryFn: () => getStats()
    })

  return { status, isPending, isSuccess, isError, isLoading, data, refetch }
}

export function usePlanningStats(year: number) {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: [`stats-${year}`],
      queryFn: () => getPlanningStats(year)
    })

  return { status, isPending, isSuccess, isError, isLoading, data, refetch }
}
