import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useModal from '../../../../../ui/components/modal/hooks/useModal'
import useUserStore from '../../../../user/store/user.store'
import logger from '../../../../../utils/logger.utils'
import SelectDistanceUnit from './SelectDistanceUnit'
import GetMyPositionInput from './GetMyPositionInput'
import type { TDistanceUnitOption } from './distanceUnitOptions'

export const ToursWithinDistanceForm = () => {
  const { closeWindow } = useModal()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedUnit, setSelectedUnit] = useState<TDistanceUnitOption | null>({
    value: 'mi',
    label: 'Miles'
  })
  const [distance, setDistance] = useState<string | undefined>(undefined)
  const userPosition = useUserStore((state) => state.userPosition)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userPosition || !distance || !selectedUnit?.value) {
      toast.info('Please fill in all fields')
      return
    }

    try {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        distance,
        lat: userPosition.lat,
        lng: userPosition.lng,
        unit: selectedUnit?.value
      })

      // Close modal
      closeWindow()
    } catch (error) {
      const err = error as Error
      logger.info(err)
      toast.error(err.message)
    }
  }

  const currentPage = searchParams.get('page') || '1'
  const handleShowAllTours = () => {
    setSearchParams({ page: currentPage })
    // Close modal
    closeWindow()
  }

  return (
    <form
      data-cy="tours-within-distance-form"
      className="m-0"
      onSubmit={handleSubmit}
    >
      <h2 className="h2">Display tours within distance</h2>

      {/* user input to fetch its position or enter its coordinates */}
      <GetMyPositionInput />

      {/* distance input */}
      <label htmlFor="distance">Distance</label>
      <input
        defaultValue={distance}
        placeholder="2000"
        onChange={(e) => setDistance(e.target.value)}
      />

      {/* distance unit input */}
      <div className="my-4">
        <SelectDistanceUnit
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
        />
      </div>

      <button className="btn-primary btn-submit" type="submit">
        Show selected tours
      </button>
      <button
        onClick={handleShowAllTours}
        className="btn-sm btn-secondary btn-submit"
        type="button"
      >
        Show all tours
      </button>
    </form>
  )
}
