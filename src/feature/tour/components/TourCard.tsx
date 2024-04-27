import type { TTour } from '../../../types/tour.types'

type TProps = {
  tour: TTour
}

const TourCard = ({ tour }: TProps) => {
  return (
    <div data-cy="tour-card">
      TourCard
      {JSON.stringify(tour)}
    </div>
  )
}

export default TourCard
