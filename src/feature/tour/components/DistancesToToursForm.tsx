import { useState } from 'react'
import { useUserStore } from '../../user/store/user.store'
import {
  getDistancesToTours,
  type TDistance
} from '../../../service/tour.service'
import logger from '../../../utils/logger.utils'
import { toast } from 'react-toastify'

export type TDistanceUnit = 'mi' | 'km'

type TProps = {
  setDistancesToTours: React.Dispatch<
    React.SetStateAction<{
      distances: TDistance[]
      unit: TDistanceUnit
    }>
  >
}

export const DistancesToToursForm = ({ setDistancesToTours }: TProps) => {
  const [unit, setUnit] = useState<TDistanceUnit>('mi')
  const userPosition = useUserStore((state) => state.userPosition)
  const setUserPosition = useUserStore((state) => state.setUserPosition)
  const getPositionStatus = useUserStore((state) => state.getPositionStatus)
  const getUserPosition = useUserStore((state) => state.getUserPosition)

  const handleGetUserPosition = async () => {
    await getUserPosition()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userPosition) return

    try {
      const distances: TDistance[] = await getDistancesToTours({
        latLng: userPosition,
        unit
      })

      setDistancesToTours({ distances, unit })
    } catch (error) {
      const err = error as Error
      logger.info(err)
      toast.error(err.message)
    }
  }

  return (
    <>
      <p>Display my distance to tours</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <p>Enter your coordinates or click on Get my position</p>
          <label htmlFor="latLng">LatLng</label>
          <div className="flex">
            <input
              disabled={getPositionStatus === 'loading'}
              id="latLng"
              type="text"
              placeholder="latitude,longitude"
              defaultValue={userPosition}
              onChange={(e) => setUserPosition(e.target.value)}
            />

            <button
              className="ml-4"
              type="button"
              onClick={handleGetUserPosition}
            >
              Get my position
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="unit">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'mi' | 'km')}
          >
            <option value="mi">mi</option>
            <option value="km">km</option>
          </select>
        </div>

        <button type="submit">Get distances</button>
      </form>
    </>
  )
}
