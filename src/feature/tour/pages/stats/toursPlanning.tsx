import { useParams } from 'react-router-dom'
import ToursPlanningStats from '../../components/stats/ToursPlanningStats'

const ToursPlanning = () => {
  const { year } = useParams()

  return (
    <>
      <h1 className="h1">Tours Planning</h1>
      <h2 className="h2">Monthly Overview for {`${year}`}</h2>
      <div
        className="p-4
          my-4
          mx-auto 
          max-w-screen-lg 
        bg-stone-100 
          shadow-xl 
          rounded-lg"
      >
        <ToursPlanningStats year={year} />
      </div>
    </>
  )
}

export default ToursPlanning
