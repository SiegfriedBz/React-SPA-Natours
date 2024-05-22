import { useNavigate, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import useUserStore from '../../user/store/user.store'
import { useGetMe } from '../../user/hooks/useGetMe'
import { useGetMyBookings } from '../hooks/useGetMyBookings'
import BookingCard from './BookingCard'
import BookingCardSkeleton from '../../../ui/components/skeleton/BookingCardSkeleton'
import type { TBooking } from '../../../types/booking.types'

const AllMyBookings = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  // necessary to fetch user after redirect from stripe checkout complete
  const {
    data: dataUser,
    isError: isErrorUser,
    isLoading: isLoadingUser
  } = useGetMe()

  const { data, isError, isLoading } = useGetMyBookings()

  useEffect(() => {
    if (dataUser?.data?.user == null) return

    // update user in ui state after fetch
    setUser(dataUser?.data?.user)
  }, [setUser, dataUser?.data?.user])

  const bookings: TBooking[] = data?.data?.bookings

  if (isLoadingUser || isLoading) {
    return (
      <div className="cards-grid">
        <LoadingSkeletons />
      </div>
    )
  }

  if (isErrorUser || isError) {
    return <Navigate to="/login" replace={true} />
  }

  return bookings?.length === 0 ? (
    <div className="text-center p-4">
      <p className="mb-8 text-lg font-semibold text-stone-700">
        You haven&apos;t booked a tour yet! Start your adventure by exploring
        our exciting tour options today.
      </p>
      <button onClick={() => navigate('/')} className="btn-xl btn-primary">
        Explore Tours
      </button>
    </div>
  ) : (
    <div className="cards-grid">
      {bookings?.map((booking) => {
        return <BookingCard key={booking?._id} booking={booking} />
      })}
    </div>
  )
}

export default AllMyBookings

const LoadingSkeletons = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, idx) => {
        return <BookingCardSkeleton key={idx} />
      })}
    </>
  )
}
