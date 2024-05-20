import { Link } from 'react-router-dom'
import MotionCardWrapper from '../../../../ui/components/MotionCardWrapper'
import SVGIcon from '../../../../ui/components/SVGIcon'
import RatingStars from '../../../../ui/components/RatingStars'
import type { TTour } from '../../../../types/tour.types'
import type { TDistance } from '../../../../service/tour.service'
import type { TDistanceUnitOption } from '../forms/searchForms/distanceUnitOptions'
import useUserStore from '../../../user/store/user.store'
import { TUser } from '../../../../types/user.types'

const API_PUBLIC_URL = import.meta.env.VITE_API_PUBLIC_URL

type TProps = {
  tour: TTour
  distanceToTour?: TDistance
  distanceUnit?: TDistanceUnitOption['value']
}

const TourCard = ({ tour, distanceToTour, distanceUnit }: TProps) => {
  const user: TUser | null = useUserStore((state) => state.user)
  const userHasPrivileges = user && user?.role !== 'user'

  const {
    name,
    imageCover,
    difficulty,
    duration,
    summary,
    startLocation,
    startDates,
    locations,
    maxGroupSize,
    price,
    ratingsAverage,
    ratingsCount
  } = tour

  return (
    <MotionCardWrapper>
      <div className="card">
        {/* card header */}
        <div className="relative h-64 group">
          <div className="absolute inset-0 u-clip-path-img">
            <div className="absolute w-full h-full u-bg-gradient-primary">
              <img
                className="object-cover h-full w-full opacity-85"
                src={`${API_PUBLIC_URL}/img/tours/${imageCover}`}
                alt={`${name}`}
              />
            </div>
          </div>
          <Link
            data-cy={`link-to-tour-details-${tour._id}`}
            to={`/tours/${tour._id}`}
            className="absolute right-3 bottom-3"
          >
            <h3 className="h3 rounded-xl ring-2 ring-stone-100">
              <span>{name}</span>
            </h3>
          </Link>
        </div>

        {/* card details */}
        <div className="p-4">
          {distanceToTour && (
            <h4 className="text-sm uppercase font-bold my-2">
              {`${distanceToTour?.distance.toFixed(2)} ${distanceUnit}`}{' '}
              <span className="text-primary font-bold tracking-wider ml-1">
                from me
              </span>
            </h4>
          )}
          <h4 className="text-sm uppercase font-bold my-2">{`${difficulty} ${duration}-day tour`}</h4>
          <p className="text-lg italic">{summary}</p>

          <div className="mt-4">
            <div className="grid grid-cols-2 justify-items-start">
              <div className="h-8 text-primary flex items-center space-x-2">
                <SVGIcon iconName="map-pin" />
                <span className="text-sm text-stone-800">
                  {startLocation.description}
                </span>
              </div>
              <div className="h-8 text-primary flex items-center space-x-2">
                <SVGIcon iconName="calendar" />
                <span className="text-sm text-stone-800">
                  {startDates && startDates.length > 0
                    ? new Date(startDates[0]).toLocaleString('en-us', {
                        month: 'long',
                        year: 'numeric'
                      })
                    : ''}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 justify-items-start">
              <div className="h-8 text-primary flex items-center space-x-2">
                <SVGIcon iconName="flag" />
                <span className="text-sm text-stone-800">
                  {locations.length} stops
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
        <div className="card-footer">
          <div className="flex flex-col gap-y-2 pl-1">
            <p>
              <span className="font-bold">${price}</span>{' '}
              <span>per person</span>
            </p>
            <p>
              <span className="font-bold">{ratingsAverage}</span>{' '}
              <span>{`rating (${ratingsCount})`}</span>
            </p>

            <RatingStars rating={ratingsAverage} />
          </div>

          <div className="flex flex-col items-end space-y-2">
            <Link className="btn btn-primary" to={`/tours/${tour._id}`}>
              Details
            </Link>

            {userHasPrivileges && (
              <Link
                className="btn btn-secondary whitespace-nowrap"
                to={`/tours/${tour._id}/update`}
              >
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>
    </MotionCardWrapper>
  )
}

export default TourCard
