import type { TBooking } from '../../../types/booking.types'

type TProps = {
  booking: TBooking
}

const BookingCard = ({ booking }: TProps) => {
  return (
    <div>
      <h1>BookingCard</h1>
      {JSON.stringify(booking)}
    </div>
  )
}

export default BookingCard
