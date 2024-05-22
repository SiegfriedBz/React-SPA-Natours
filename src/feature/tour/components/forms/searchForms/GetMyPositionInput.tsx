import useUserStore from '../../../../user/store/user.store'
import useGetUserPosition from '../../../../user/hooks/useGetUserPosition'

import Loading from '../../../../../ui/components/loading/Loading'
import GetMyPositionButton from '../../tours/GetMyPositionButton'

const GetMyPositionInput = () => {
  const userPosition = useUserStore((state) => state.userPosition)
  const setUserPosition = useUserStore((state) => state.setUserPosition)
  const { handleGetUserPosition, isLoadingUserPosition } = useGetUserPosition()

  return (
    <>
      <label className="mb-0" htmlFor="latLng">
        Click on{' '}
        <span className="italic text-xl tracking-wide text-primary-dark font-extrabold">
          Get my position
        </span>{' '}
        <span className="block whitespace-nowrap opacity-80">
          or enter your coordinates
        </span>
      </label>
      <div className="flex max-sm:flex-col max-sm:gap-y-2 sm:h-16 sm:space-x-4 w-full max-sm:items-start items-center">
        <GetMyPositionButton
          disabled={isLoadingUserPosition}
          onClick={handleGetUserPosition}
        />

        {isLoadingUserPosition ? (
          <Loading variant="sm" />
        ) : (
          <input
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
        )}
      </div>
    </>
  )
}

export default GetMyPositionInput
