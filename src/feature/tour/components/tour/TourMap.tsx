import { useGetTour } from '../../hooks/useGetTour'
import Map from '../../../../ui/components/map/Map'
import MapSkeleton from '../../../../ui/components/skeleton/MapSkeleton'
import RefetchButton from '../../../../ui/components/RefetchButton'
import type { TTour } from '../../../../types/tour.types'

type TProps = {
  tourId?: string
}

/** map top & bottom borders' slope 12vw (y) / 100vw (x) */
const TourMap = ({ tourId }: TProps) => {
  const { data, refetch, isError, isLoading } = useGetTour({
    tourId: tourId as string
  })

  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  const tour: TTour | undefined = data?.data?.tour

  return (
    <section
      className="
        max-sm:-mt-[18vw] 
        max-md:-mt-[22vw] 
        max-lg:-mt-[21.5vw] 
        max-xl:-mt-[21vw] 
        max-2xl:-mt-[36vw] 
        2xl:-mt-[34vw]
        max-sm:[clip-path:_polygon(0_16vw,_100vw_4vw,_100vw_72vw,_0vw_84vw)]
        max-xl:[clip-path:_polygon(0_20vw,_100vw_8vw,_100vw_68vw,_0vw_80vw)]
        xl:[clip-path:_polygon(0_34vw,_100vw_22vw,_100vw_54vw,_0vw_66vw)]
      "
    >
      {isLoading || !tour?.startLocation || !tour?.locations ? (
        <MapSkeleton />
      ) : (
        <Map startLocation={tour.startLocation} locations={tour?.locations} />
      )}
    </section>
  )
}

export default TourMap
