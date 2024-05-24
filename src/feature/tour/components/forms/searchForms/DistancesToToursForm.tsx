import { useState } from 'react'
import { toast } from 'react-toastify'
import useModal from '../../../../../ui/components/modal/hooks/useModal'
import useUserStore from '../../../../user/store/user.store'
import GetMyPositionInput from './GetMyPositionInput'
import SelectDistanceUnit from './SelectDistanceUnit'
import {
  getDistancesToTours,
  type TDistance
} from '../../../../../service/tour.service'
import Loading from '../../../../../ui/components/loading/Loading'
import logger from '../../../../../utils/logger.utils'
import type { TDistanceUnitOption } from './distanceUnitOptions'
import SVGIcon from '../../../../../ui/components/SVGIcon'

type TProps = {
  setDistancesToTours: React.Dispatch<
    React.SetStateAction<{
      distances: TDistance[]
      unit: TDistanceUnitOption['value']
    }>
  >
}

export const DistancesToToursForm = ({ setDistancesToTours }: TProps) => {
  const [isLoadingDistances, setIsLoadingDistances] = useState(false)
  const { closeWindow } = useModal()
  const [selectedUnit, setSelectedUnit] = useState<TDistanceUnitOption | null>({
    value: 'mi',
    label: 'Miles'
  })

  const userPosition = useUserStore((state) => state.userPosition)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userPosition?.lat || !userPosition?.lng || !selectedUnit?.value) {
      toast.info('Please fill in all fields')
      return
    }

    try {
      setIsLoadingDistances(true)
      const distances: TDistance[] = await getDistancesToTours({
        latLng: `${userPosition?.lat},${userPosition?.lng}`,
        unit: selectedUnit?.value
      })

      setDistancesToTours({ distances, unit: selectedUnit?.value })

      // Close modal
      closeWindow()
    } catch (error) {
      const err = error as Error
      logger.info(err)
      toast.error(err.message)
    } finally {
      setIsLoadingDistances(false)
    }
  }

  return (
    <form
      data-cy="distances-to-tours-form"
      className="m-0"
      onSubmit={handleSubmit}
    >
      <h2 className="h2 flex space-x-2">
        <SVGIcon iconName="flag" />
        <span>My distance to tours</span>
      </h2>

      {isLoadingDistances ? (
        <Loading />
      ) : (
        <>
          {/* input to fetch user position or enter its coordinates */}
          <GetMyPositionInput />

          {/* distance unit input */}
          <div className="my-4">
            <SelectDistanceUnit
              selectedUnit={selectedUnit}
              setSelectedUnit={setSelectedUnit}
            />
          </div>

          <button className="btn-primary btn-submit" type="submit">
            <div className=" text-stone-50 flex items-center space-x-2">
              <SVGIcon iconName="flag" color="#f5f5f4" />
              <span className="text-sm text-stone-50">Get distances</span>
            </div>
          </button>
        </>
      )}
    </form>
  )
}
