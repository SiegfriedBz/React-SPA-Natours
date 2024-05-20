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
      data-cy="insights-charts-wrapper"
      className={`max-lg:min-h-[54vh] lg:h-[54vh]`}
    >
      {isLoading ? (
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <StatsRadarChart stats={stats} />
      )}
    </div>
  )
}

export default ToursInsightsStats
