import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

type Stat = {
  _id: string
  [key: string]: number | string
}

type TProps = {
  stats: Stat[]
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    color: string
    name: string
    value: string | number
  }>
  label?: string
}

const colors = ['#55c57a', '#8884d8', '#ff7730']
const priceKeys = ['avgPrice', 'minPrice', 'maxPrice']
const ratingKeys = ['avgRating', 'totalRatingsCount', 'totalToursCount']
const labels = {
  avgPrice: 'Av Price',
  minPrice: 'Min Price',
  maxPrice: 'Max Price',
  avgRating: 'Av Rating',
  totalRatingsCount: 'Total Ratings',
  totalToursCount: 'Total Tours'
}

const StatsRadarChart = ({ stats }: TProps) => {
  const createData = (keys: string[]) => {
    return keys.map((key) => {
      const easy = Number(stats.find((stat) => stat._id === 'easy')?.[key]) || 0
      const medium =
        Number(stats.find((stat) => stat._id === 'medium')?.[key]) || 0
      const difficult =
        Number(stats.find((stat) => stat._id === 'difficult')?.[key]) || 0
      return {
        subject: labels[key as keyof typeof labels],
        easy,
        medium,
        difficult
      }
    })
  }

  return (
    <div
      data-cy="stats-by-difficulty-charts-wrapper"
      className="
        max-lg:max-w-[32rem]
        max-lg:flex 
        max-lg:flex-col 
        max-md:space-y-8
        max-lg:space-y-16
        max-lg:mx-auto 
        max-lg:min-h-screen 
        lg:grid lg:grid-cols-2 lg:gap-x-2 "
    >
      <PriceChart createData={createData} />
      <RatingChart createData={createData} />
    </div>
  )
}

export default StatsRadarChart

type TChartProps = {
  createData: (keys: string[]) => {
    subject: string
    easy: number
    medium: number
    difficult: number
  }[]
}

const PriceChart = ({ createData }: TChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="75%" minHeight={400}>
        <RadarChart
          data={createData(priceKeys)}
          margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />

          {['easy', 'medium', 'difficult'].map((difficulty, index) => {
            const name = `${difficulty.slice(0, 1).toUpperCase()}${difficulty.slice(1)}`

            return (
              <Radar
                key={index}
                name={name}
                dataKey={difficulty}
                stroke={colors[index]}
                fill={colors[index]}
                fillOpacity={0.6}
              />
            )
          })}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  )
}
const RatingChart = ({ createData }: TChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="75%" minHeight={400}>
        <RadarChart
          data={createData(ratingKeys)}
          margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          {['easy', 'medium', 'difficult'].map((difficulty, index) => {
            const name = `${difficulty.slice(0, 1).toUpperCase()}${difficulty.slice(1)}`

            return (
              <Radar
                key={index}
                name={name}
                dataKey={difficulty}
                stroke={colors[index]}
                fill={colors[index]}
                fillOpacity={0.6}
              />
            )
          })}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  )
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg">
        <p className="label">{`${label}`}</p>
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.color }}>
            {`${item.name}: ${item.value}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}
