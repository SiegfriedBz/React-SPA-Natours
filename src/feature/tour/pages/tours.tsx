import { useState } from 'react'
import AllTours from '../components/AllTours'
import {
  DistancesToToursForm,
  type TDistanceUnit
} from '../components/DistancesToToursForm'
import type { TDistance } from '../../../service/tour.service'

export type TDistancesToTours = {
  distances: TDistance[]
  unit: TDistanceUnit
}

const Tours = () => {
  const [distancesToTours, setDistancesToTours] = useState<TDistancesToTours>({
    distances: [],
    unit: 'mi'
  })

  return (
    <div>
      All Tours page
      <DistancesToToursForm setDistancesToTours={setDistancesToTours} />
      <AllTours distancesToTours={distancesToTours} />
    </div>
  )
}

export default Tours
