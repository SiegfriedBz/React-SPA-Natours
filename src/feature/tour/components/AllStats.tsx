import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useStats } from '../hooks/useStats'
import TourStatCard from './TourStatCard'
import type { TTourStat } from '../../../types/tour.types'

const AllStats = () => {
  const {
    data,
    refetch,
    // status, isPending, isSuccess,
    isError,
    isLoading
  } = useStats()

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

  // TMonthlyStats
  const stats: TTourStat[] = data?.data?.stats

  // Render fetched data
  return (
    <div>
      {stats?.map((stat) => {
        return <TourStatCard key={stat?._id} stat={stat} />
      })}
    </div>
  )
}

export default AllStats
