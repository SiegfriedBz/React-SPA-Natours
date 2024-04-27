import { TTourStat } from '../../../types/tour.types'

type TProps = {
  stat: TTourStat
}
const TourStatCard = ({ stat }: TProps) => {
  return (
    <div data-cy="stat-card">
      TourStatCard
      {JSON.stringify(stat)}
    </div>
  )
}

export default TourStatCard
