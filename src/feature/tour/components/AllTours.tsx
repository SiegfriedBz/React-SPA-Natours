import { useTour } from '../hooks/useTour'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import TourCard from './TourCard'
import type { TTour } from '../../../types/tour.types'
import type { TDistancesToTours } from '../pages/tours'
import { useSearchParams } from 'react-router-dom'
import { TDistanceUnit } from './DistancesToToursForm'

type TProps = {
  distancesToTours?: TDistancesToTours
}

const AllTours = ({ distancesToTours }: TProps) => {
  const [searchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const distance = searchParams.get('distance')
  const unit = searchParams.get('unit') as TDistanceUnit

  const filterTours =
    lat && lng && distance && unit
      ? { latLng: `${lat},${lng}`, distance, unit }
      : {}

  const {
    data,
    refetch,
    // status, isPending, isSuccess,
    isError,
    isLoading
  } = useTour(filterTours)

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

  const tours: TTour[] = data?.data?.tours
  console.log('===== tours?.length', tours?.length)
  return (
    <>
      {tours?.map((tour) => {
        const distanceToTour = distancesToTours?.distances?.find(
          (distance) => distance?._id === tour?._id
        )
        return (
          <TourCard
            key={tour?._id}
            tour={tour}
            distanceToTour={distanceToTour}
            distanceUnit={distancesToTours?.unit}
          />
        )
      })}
    </>
  )
}

export default AllTours
