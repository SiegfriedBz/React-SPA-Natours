import { useQuery } from '@tanstack/react-query'
import { getMyBookings } from '../../../service/booking.service'

export function useGetMyBookings() {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: ['my-bookings'],
      queryFn: getMyBookings
    })

  return { data, refetch, status, isPending, isSuccess, isError, isLoading }
}
