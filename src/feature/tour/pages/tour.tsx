import { useParams } from 'react-router'
import TourDetails from '../components/TourDetails'

const Tour = () => {
  const { tourId } = useParams()

  return (
    <>
      TourDetails page
      <TourDetails tourId={tourId} />
    </>
  )
}

export default Tour
