import type { TTour } from '../../../types/tour.types'
import logger from '../../../utils/logger.utils'

type TProps = {
  tour: TTour
}

const TourCard = ({ tour }: TProps) => {
  logger.info({ tour })

  return <div>TourCard</div>
}

export default TourCard
