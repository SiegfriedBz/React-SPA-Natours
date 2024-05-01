import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useGetMyBookings } from '../hooks/useGetMyBookings'
import BookingCard from './BookingCard'
import type { TBooking } from '../../../types/booking.types'

const AllMyBookings = () => {
  const {
    data,
    refetch,
    // status, isPending, isSuccess,
    isError,
    isLoading
  } = useGetMyBookings()

  if (isLoading) {
    return (
      <div>
        <div className="h-56 w-64">
          <SkeletonTheme baseColor="#55c57a" highlightColor="#43a263">
            <p>
              <Skeleton count={3.5} containerClassName="flex-1" />
            </p>
          </SkeletonTheme>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <div>Error fetching data</div>
        <button type="button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    )
  }

  const bookings: TBooking[] = data?.data?.bookings

  return (
    <>
      {bookings?.map((booking) => {
        return <BookingCard key={booking?._id} booking={booking} />
      })}
    </>
  )
}

export default AllMyBookings
