import { useState } from 'react'
import { useUserStore } from '../../user/store/user.store'
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
  const user = useUserStore((state) => state.user)
  const [distancesToTours, setDistancesToTours] = useState<TDistancesToTours>({
    distances: [],
    unit: 'mi'
  })

  return (
    <div>
      All Tours page
      {user && (
        <DistancesToToursForm setDistancesToTours={setDistancesToTours} />
      )}
      <AllTours distancesToTours={distancesToTours} />
    </div>
  )
}

export default Tours
