import { useParams } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useMonthlyStats } from '../hooks/useStats'
import type { TMonthlyStats } from '../../../types/tour.types'

const MonthlyStats = () => {
  const { year } = useParams()

  const {
    data,
    refetch,
    // status, isPending, isSuccess,
    isError,
    isLoading
  } = useMonthlyStats(Number(year) || 2024)

  if (isLoading) {
    return (
      <div>
        <div className="h-56 w-64">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
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
  const stats: TMonthlyStats[] = data?.data?.stats
  // Render fetched data
  return (
    <div>
      MonthlyStats
      {JSON.stringify(stats)}
    </div>
  )
}

export default MonthlyStats
