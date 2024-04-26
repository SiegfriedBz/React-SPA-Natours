import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useStats } from '../hooks/useStats'
import type { TTourStats } from '../../../types/tour.types'

const Stats = () => {
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
        <div className='h-56 w-64'>
          <SkeletonTheme baseColor='#202020' highlightColor='#444'>
            <p>
              <Skeleton count={3.5} containerClassName='flex-1' />
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
        <button type='button' onClick={() => refetch()}>
          Retry
        </button>
      </div>
    )
  }

  // TMonthlyStats
  const stats: TTourStats[] = data?.data?.stats
  // Render fetched data
  return (
    <div>
      Stats
      {JSON.stringify(stats)}
    </div>
  )
}

export default Stats
