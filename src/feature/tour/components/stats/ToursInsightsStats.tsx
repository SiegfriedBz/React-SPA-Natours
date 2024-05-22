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
      className="container mx-auto"
      data-cy="insights-charts-wrapper"
      // className={`max-lg:min-h-[54vh] lg:h-[54vh]`}
    >
      {isLoading ? (
        <div
          className="
            max-lg:max-w-[32rem]
            flex mx-auto
            max-lg:flex-col 
            max-lg:space-y-4
            lg:flex-row
          "
        >
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <div
          className="
            max-lg:max-w-[32rem]
            flex mx-auto
            max-lg:flex-col 
            max-lg:space-y-4
            lg:flex-row
        "
        >
          <StatsRadarChart stats={stats} />
        </div>
      )}
    </div>
  )
}

export default ToursInsightsStats
