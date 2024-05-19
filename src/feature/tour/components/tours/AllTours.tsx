import { forwardRef } from 'react'
import { useGetAllTours } from '../../hooks/useGetAllTours'
import TourCard from './TourCard'
import TourCardSkeleton from '../../../../ui/components/skeleton/TourCardSkeleton'
import RefetchButton from '../../../../ui/components/RefetchButton'
import type { TDistancesToTours } from '../../pages/tours'
import type { TTour } from '../../../../types/tour.types'

type TProps = {
  distancesToTours?: TDistancesToTours
}

const AllTours = forwardRef<HTMLDivElement, TProps>((props, ref) => {
  const { distancesToTours } = props

  const {
    currentPageResult: { data, isLoading, isError, refetch }
  } = useGetAllTours()

  const tours: TTour[] = data?.tours || []

  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  return (
    <div ref={ref} className="cards-grid">
      {isLoading ? (
        <LoadingSkeletons />
      ) : (
        <>
          {tours?.map((tour) => {
            const distanceToTour = distancesToTours?.distances?.find(
              (distance) => distance?._id === tour?._id
            )
            return (
              <TourCard
                key={tour?._id}
                tour={tour}
                distanceToTour={distanceToTour}
                distanceUnit={distancesToTours?.unit}
              />
            )
          })}
        </>
      )}
    </div>
  )
})

AllTours.displayName = 'AllTours'
export default AllTours

const LoadingSkeletons = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, idx) => {
        return <TourCardSkeleton key={idx} />
      })}
    </>
  )
}
