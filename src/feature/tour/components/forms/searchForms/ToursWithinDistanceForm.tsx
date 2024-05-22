import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useModal from '../../../../../ui/components/modal/hooks/useModal'
import useUserStore from '../../../../user/store/user.store'
import logger from '../../../../../utils/logger.utils'
import SelectDistanceUnit from './SelectDistanceUnit'
import GetMyPositionInput from './GetMyPositionInput'
import type { TDistanceUnitOption } from './distanceUnitOptions'
import SVGIcon from '../../../../../ui/components/SVGIcon'

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
  const handleClear = () => {
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
      <h2 className="h2 flex space-x-2">
        <SVGIcon iconName="compass" />
        <span>Tours within radius</span>
      </h2>

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

      <div className="flex my-2 space-x-4">
        <button
          onClick={handleClear}
          className="group btn-sm btn-secondary u-scale-sm btn-submit"
          type="button"
        >
          <div className="h-8 flex items-center space-x-2">
            <SVGIcon
              wrapperClassName="text-stone-700 group-hover:text-primary-light"
              iconName="x-circle"
              color="currentColor"
            />
            <span className="text-sm">Clear</span>
          </div>
        </button>

        <button className="btn-sm btn-primary btn-submit" type="submit">
          <div className="h-8 text-stone-50 flex items-center space-x-2">
            <SVGIcon iconName="search" color="#f5f5f4" />
            <span className="text-sm text-stone-50">Filter</span>
          </div>
        </button>
      </div>
    </form>
  )
}
