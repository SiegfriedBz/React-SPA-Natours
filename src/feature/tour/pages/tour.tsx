import { useParams } from 'react-router'
import TourDetails from '../components/tour/TourDetails'
import TourMap from '../components/tour/TourMap'
import TourReviews from '../components/tour/TourReviews'
import TourCta from '../components/tour/TourCta'

const Tour = () => {
  const { tourId } = useParams()

  return (
    <div>
      <TourDetails tourId={tourId} />
      <TourMap tourId={tourId} />
      <TourReviews tourId={tourId} />
      <TourCta tourId={tourId} />
    </div>
  )
}

export default Tour
