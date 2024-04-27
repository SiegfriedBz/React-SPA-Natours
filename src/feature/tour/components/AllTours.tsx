import { useTour } from '../hooks/useTour'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import TourCard from './TourCard'
import type { TTour } from '../../../types/tour.types'

const AllTours = () => {
  const {
    data,
    refetch,
    // status, isPending, isSuccess,
    isError,
    isLoading
  } = useTour()

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
  return (
    <>
      {tours?.map((tour) => {
        return <TourCard key={tour?._id} tour={tour} />
      })}
    </>
  )
}

export default AllTours
