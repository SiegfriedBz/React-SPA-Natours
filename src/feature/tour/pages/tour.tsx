import { useParams } from 'react-router'
import TourDetails from '../components/TourDetails'
import TourMap from '../components/TourMap'
import TourReviews from '../components/TourReviews'

const Tour = () => {
  const { tourId } = useParams()

  return (
    <>
      TourDetails page
      <section>
        <h2>Tour Details</h2>
        <TourDetails tourId={tourId} />
      </section>
      <section>
        <h2>Tour Map</h2>
        <TourMap tourId={tourId} />
      </section>
      <section>
        <h2>Tour Reviews</h2>
        <TourReviews tourId={tourId} />
      </section>
    </>
  )
}

export default Tour
