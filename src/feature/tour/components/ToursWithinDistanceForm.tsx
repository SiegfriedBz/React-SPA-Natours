import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserStore } from '../../user/store/user.store'
import logger from '../../../utils/logger.utils'
import type { TDistanceUnit } from './DistancesToToursForm'

export const ToursWithinDistanceForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [unit, setUnit] = useState<TDistanceUnit>('mi')
  const [distance, setDistance] = useState<string | undefined>(undefined)
  const userPosition = useUserStore((state) => state.userPosition)
  const setUserPosition = useUserStore((state) => state.setUserPosition)
  const getPositionStatus = useUserStore((state) => state.getPositionStatus)
  const getUserPosition = useUserStore((state) => state.getUserPosition)

  const handleGetUserPosition = async () => {
    try {
      await getUserPosition()
    } catch (error) {
      const err = error as Error
      logger.info(err)
      toast.error(err.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userPosition || !distance) return

    try {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        distance,
        lat: userPosition.lat,
        lng: userPosition.lng,
        unit
      })
    } catch (error) {
      const err = error as Error
      logger.info(err)
      toast.error(err.message)
    }
  }

  return (
    <>
      <p>Display tours within</p>
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
              defaultValue={
                userPosition?.lat && userPosition?.lng
                  ? `${userPosition?.lat},${userPosition?.lng}`
                  : ''
              }
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
          <label htmlFor="distance">Distance</label>
          <input
            defaultValue={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
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

        <button type="submit">Get tours</button>
      </form>
    </>
  )
}
