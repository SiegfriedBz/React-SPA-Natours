import { Link } from 'react-router-dom'
import ModalProvider from '../../../ui/components/modal/Modal'
import CreateReviewForm from '../../review/components/CreateReviewForm'
import MotionCardWrapper from '../../../ui/components/MotionCardWrapper'
import SVGIcon from '../../../ui/components/SVGIcon'
import type { TBooking } from '../../../types/booking.types'

const API_PUBLIC_URL = import.meta.env.VITE_API_PUBLIC_URL

type TProps = {
  booking: TBooking
}

const BookingCard = ({ booking }: TProps) => {
  const bookingPrice = booking.price
  const {
    _id: tourId,
    name: tourName,
    // slug,
    imageCover,
    difficulty,
    duration,
    locations,
    maxGroupSize,
    ratingsAverage,
    ratingsCount
  } = booking.tour

  return (
    <MotionCardWrapper>
      <div data-cy="booking-card" className="card">
        {/* card header */}
        <div className="relative h-64">
          {imageCover && (
            <div className="absolute inset-0 u-clip-path-img">
              <div className="absolute w-full h-full u-bg-gradient-primary">
                <img
                  className="object-cover h-full w-full opacity-85"
                  src={`${API_PUBLIC_URL}/img/tours/${imageCover}`}
                  alt={`${tourName}`}
                />
              </div>
            </div>
          )}
          <Link to={`/tours/${tourId}`} className="absolute right-3 bottom-3">
            <h3 className="h3 rounded-xl ring-2 ring-stone-100">
              <span>{tourName}</span>
            </h3>
          </Link>
        </div>

        {/* card details */}
        <div className="p-4">
          <h4 className="text-sm uppercase font-bold my-2">{`${difficulty} ${duration}-day tour`}</h4>

          <div className="mt-4">
            <div className="grid grid-cols-2 justify-items-start">
              <div className="h-8 text-primary flex items-center space-x-2">
                <SVGIcon iconName="flag" />
                <span className="text-sm text-stone-800">
                  {locations?.length || 1}{' '}
                  {locations?.length > 2 ? 'stops' : 'stop'}
                </span>
              </div>
              <div className="h-8 text-primary flex items-center space-x-2">
                <SVGIcon iconName="user" />
                <span className="text-sm text-stone-800">
                  {maxGroupSize} people
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* card footer */}
        <div
          className="p-4
          bg-stone-100
          flex items-center justify-between
          "
        >
          <div className="flex flex-col gap-y-2 pl-1">
            <p>
              <span className="font-bold">${bookingPrice}</span>{' '}
            </p>
            <p>
              <span className="font-bold">{ratingsAverage}</span>{' '}
              <span>{`rating (${ratingsCount})`}</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-y-1">
            {/* Tour link */}
            <Link className="btn btn-primary" to={`/tours/${tourId}`}>
              Details
            </Link>

            {/* Create review button/modal */}
            <ModalProvider>
              <ModalProvider.OpenButton
                className="btn-primary btn-submit"
                windowNameToOpen="create-review"
              >
                <span>Review this tour</span>
              </ModalProvider.OpenButton>
              <ModalProvider.Window windowNameToOpen="create-review">
                <CreateReviewForm
                  tourId={tourId}
                  tourName={tourName}
                  tourImageCover={imageCover}
                  tourCurrentRatingsAverage={ratingsAverage}
                />
              </ModalProvider.Window>
            </ModalProvider>
          </div>
        </div>
      </div>
    </MotionCardWrapper>
  )
}

export default BookingCard
