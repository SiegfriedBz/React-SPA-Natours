import { useNavigate } from 'react-router-dom'
import { usePlanningStats } from '../../hooks/useStats'
import StatsBarChart from './charts/StatsBarChart'
import SelectYear from './SelectYear'
import ChartSkeleton from '../../../../ui/components/skeleton/ChartSkeleton'
import RefetchButton from '../../../../ui/components/RefetchButton'
import type { TMonthlyStat } from '../../../../types/tour.types'

type TProps = {
  year?: string
}

const ToursPlanningStats = ({ year }: TProps) => {
  const { data, refetch, isError, isLoading } = usePlanningStats(
    Number(year) || 2024
  )

  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  const stats: TMonthlyStat[] = data?.data?.stats

  return (
    <div>
      {isLoading ? (
        <div className="flex h-[54vh] flex-col mx-auto items-center justify-center">
          <ChartSkeleton />
        </div>
      ) : (
        <div
          data-cy="planning-stats-by-year-charts-wrapper"
          className="flex h-[54vh] w-full flex-col mx-auto items-center justify-center"
        >
          <StatsBarChart data={stats} />
          <SelectYearForStats defaultValue={year} />
        </div>
      )}
    </div>
  )
}

export default ToursPlanningStats

type TSelectYearForStatsProps = {
  defaultValue?: string
}
const SelectYearForStats = ({ defaultValue }: TSelectYearForStatsProps) => {
  const navigate = useNavigate()

  return (
    <div className="my-4 w-5/6 flex items-center space-x-4">
      <label className="text-lg font-semibold" htmlFor="year">
        Select Year
      </label>
      <SelectYear
        selectedYear={{
          value: defaultValue || '2024',
          label: defaultValue || '2024'
        }}
        setSelectedYear={(option) => {
          navigate(`/tours/planning/${option.value}`)
        }}
      />
    </div>
  )
}
