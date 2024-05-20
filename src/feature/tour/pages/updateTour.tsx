import { useParams } from 'react-router'
import UpdateTourForm from '../components/forms/UpdateTourForm'

const UpdateTour = () => {
  const { tourId } = useParams()

  return (
    <>
      <h1 className="h1">Update Tour</h1>
      <UpdateTourForm tourId={tourId} />
    </>
  )
}

export default UpdateTour
