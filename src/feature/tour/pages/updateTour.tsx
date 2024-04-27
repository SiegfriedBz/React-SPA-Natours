import { useParams } from 'react-router'
import UpdateTourForm from '../components/UpdateTourForm'

const UpdateTour = () => {
  const { tourId } = useParams()

  return (
    <div>
      Update Tour page
      <UpdateTourForm tourId={tourId} />
    </div>
  )
}

export default UpdateTour
