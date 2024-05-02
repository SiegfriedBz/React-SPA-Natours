import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useTour } from '../hooks/useTour'
import Map from '../../../ui/components/map/Map'
import { TTour } from '../../../types/tour.types'

type TProps = {
  tourId?: string
}

const TourMap = ({ tourId }: TProps) => {
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
    <>
      {tour?.startLocation && tour?.locations && (
        <Map startLocation={tour.startLocation} locations={tour.locations} />
      )}
    </>
  )
}

export default TourMap
