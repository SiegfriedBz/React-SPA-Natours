import { useQuery } from '@tanstack/react-query'
import { getStats, getMonthlyStats } from '../../../service/tour.service'

export function useStats() {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: ['stats'],
      queryFn: () => getStats()
    })

  return { status, isPending, isSuccess, isError, isLoading, data, refetch }
}

export function useMonthlyStats(year: number) {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: ['stats'],
      queryFn: () => getMonthlyStats(year)
    })

  return { status, isPending, isSuccess, isError, isLoading, data, refetch }
}
