import { useStats } from '../../hooks/useStats'
import StatsRadarChart from './charts/StatsRadarChart'
import RefetchButton from '../../../../ui/components/RefetchButton'
import ChartSkeleton from '../../../../ui/components/skeleton/ChartSkeleton'
import type { TTourStat } from '../../../../types/tour.types'

const ToursInsightsStats = () => {
  const { data, refetch, isError, isLoading } = useStats()

  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  const stats: TTourStat[] = data?.data?.stats

  return (
    <div
      className="container 
            flex mx-auto
            max-lg:flex-col 
            max-lg:max-w-[32rem]
            max-lg:space-y-4
            lg:space-x-4
            lg:flex-row"
      data-cy="insights-charts-wrapper"
    >
      {isLoading ? (
        <>
          <ChartSkeleton />
          <ChartSkeleton />
        </>
      ) : (
        <StatsRadarChart stats={stats} />
      )}
    </div>
  )
}

export default ToursInsightsStats
