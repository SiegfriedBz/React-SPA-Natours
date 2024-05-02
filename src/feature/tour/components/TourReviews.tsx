import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useGetAllReviewsOnTour } from '../../review/hooks/useGetAllReviewsOnTour'
import ModalProvider from '../../../ui/components/modal/Modal'
import CreateReviewForm from '../../review/components/CreateReviewForm'
import TourReviewCard from './TourReviewCard'
import type { TReview } from '../../../types/review.types'

type TProps = {
  tourId?: string
}

const TourReviews = ({ tourId }: TProps) => {
  const {
    data,
    refetch,
    // status, isPending, isSuccess,
    isError,
    isLoading
  } = useGetAllReviewsOnTour({ tourId: tourId as string })

  if (isLoading) {
    return (
      <div>
        <div className="h-56 w-64">
          <SkeletonTheme baseColor="#55c57a" highlightColor="#43a263">
            <p>
              <Skeleton count={3.5} containerClassName="flex-1" />
            </p>
          </SkeletonTheme>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <div>Error fetching data</div>
        <button type="button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    )
  }

  const tourReviews: TReview[] = data?.data?.reviews

  return (
    <>
      {tourReviews.map((review) => {
        return <TourReviewCard key={review._id} review={review} />
      })}

      <ModalProvider>
        <ModalProvider.OpenButton
          className="bg-blue-500 px-4 py-2"
          windowNameToOpen="createReview"
        >
          <span>Create review</span>
        </ModalProvider.OpenButton>
        <ModalProvider.Window windowNameToOpen="createReview">
          <CreateReviewForm />
        </ModalProvider.Window>
      </ModalProvider>
    </>
  )
}

export default TourReviews
