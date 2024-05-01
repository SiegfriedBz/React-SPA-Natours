import { useTour } from '../hooks/useTour'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import StripeCheckoutButton from '../../stripe/components/StripeCheckoutButton'
import type { TTour } from '../../../types/tour.types'
import TourDetailsMap from '../../map/components/TourDetailsMap'

type TProps = {
  tourId?: string
}

const TourDetails = ({ tourId }: TProps) => {
  const {
    data,
    refetch,
    // status, isPending, isSuccess,
    isError,
    isLoading
  } = useTour({ tourId })

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

  const tour: TTour = data?.data?.tour

  return (
    <div data-cy="tour-details-wrapper">
      <span>Tour name: {tour?.name}</span>

      {tourId && <StripeCheckoutButton tourId={tourId} />}

      {JSON.stringify(tour)}

      {tour?.startLocation && tour?.locations && (
        <TourDetailsMap
          startLocation={tour.startLocation}
          locations={tour.locations}
        />
      )}
    </div>
  )
}

export default TourDetails
