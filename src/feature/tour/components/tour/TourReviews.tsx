import { useGetAllReviewsOnTour } from '../../../review/hooks/useGetAllReviewsOnTour'
import TourReviewCard from './TourReviewCard'
import type { TReview } from '../../../../types/review.types'
import RefetchButton from '../../../../ui/components/RefetchButton'
import TourReviewsSkeleton from '../../../../ui/components/skeleton/TourReviewsSkeleton'

type TProps = {
  tourId?: string
}

const TourReviews = ({ tourId }: TProps) => {
  const { data, refetch, isError, isLoading } = useGetAllReviewsOnTour({
    tourId: tourId as string
  })

  if (isLoading) {
    return <TourReviewsSkeleton />
  }
  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  const tourReviews: TReview[] = data?.data?.reviews
  return (
    <section
      data-cy="tour-reviews"
      className="
        relative
        max-sm:-mt-[38vw]
        max-md:-mt-[42vw]
        max-lg:-mt-[46vw]
        max-xl:-mt-[48vw]
        xl:-mt-[52vw]
        max-md:reviewsBgSmall
        md:reviewsBgBig
        h-[124vw]
        max-h-[64rem]

        max-sm:[clip-path:_polygon(0_22vw,_100vw_10vw,_100vw_98vw,_0vw_110vw)]
        max-md:[clip-path:_polygon(0_22vw,_100vw_10vw,_100vw_76vw,_0vw_88vw)]
        max-lg:[clip-path:_polygon(0_26vw,_100vw_14vw,_100vw_68vw,_0vw_80vw)]
        max-xl:[clip-path:_polygon(0_28vw,_100vw_16vw,_100vw_64vw,_0vw_76vw)]
        xl:[clip-path:_polygon(0_18vw,_100vw_6vw,_100vw_46vw,_0vw_58vw)]
        2xl:[clip-path:_polygon(0_18vw,_100vw_6vw,_100vw_38vw,_0vw_50vw)]

        w-full
      "
    >
      <div
        className="absolute
          top-1/4 -translate-y-1/4
          left-1/2 -translate-x-1/2
          flex w-[75vw] 
          mx-auto 
          space-x-24 
          overflow-x-auto u-no-scrollbar"
      >
        {tourReviews.map((review) => {
          return <TourReviewCard key={review._id} review={review} />
        })}
      </div>
    </section>
  )
}

export default TourReviews
