import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts'
import type { TMonthlyStat } from '../../../../../types/tour.types'

type TProps = {
  data: TMonthlyStat[]
}
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const StatsBarChart = ({ data }: TProps) => {
  const sortedData = data?.sort((a, b) => a.month - b.month)

  return (
    <ResponsiveContainer width="100%" height="75%" maxHeight={400}>
      <BarChart
        width={800}
        height={400}
        data={sortedData}
        margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={(monthIndex) => monthNames[monthIndex - 1]}
        />
        <YAxis />
        <Tooltip labelFormatter={(value) => monthNames[value - 1]} />
        <Legend />
        <Bar
          dataKey="toursStartcount"
          fill="#55c57a"
          name="Planned number of tours"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StatsBarChart
