import { useParams } from 'react-router-dom'
import AllStatsForYear from '../components/AllStatsForYear'

const MonthlyStats = () => {
  const { year } = useParams()

  return (
    <div>
      MonthlyStats - year {year}
      <AllStatsForYear year={year} />
    </div>
  )
}

export default MonthlyStats
