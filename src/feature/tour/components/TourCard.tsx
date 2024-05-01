import { Link } from 'react-router-dom'
import { TDistance } from '../../../service/tour.service'
import type { TTour } from '../../../types/tour.types'
import type { TDistanceUnit } from './DistancesToToursForm'

type TProps = {
  tour: TTour
  distanceToTour?: TDistance
  distanceUnit?: TDistanceUnit
}

const TourCard = ({ tour, distanceToTour, distanceUnit }: TProps) => {
  return (
    <div data-cy="tour-card" className="my-2">
      TourCard
      {distanceToTour && (
        <div>
          StartLocation distance from me: {distanceToTour?.distance.toFixed(2)}{' '}
          {distanceUnit}
        </div>
      )}
      <Link to={`/tours/${tour._id}`}>Tour details</Link>
      <div>{JSON.stringify(tour)}</div>
    </div>
  )
}

export default TourCard
