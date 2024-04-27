import { useMonthlyStats } from '../hooks/useStats'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import type { TMonthlyStat } from '../../../types/tour.types'

type TProps = {
  year?: string
}

const AllStatsForYear = ({ year }: TProps) => {
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
  const stats: TMonthlyStat[] = data?.data?.stats

  // Render fetched data
  return <div> {JSON.stringify(stats)}</div>
}

export default AllStatsForYear
