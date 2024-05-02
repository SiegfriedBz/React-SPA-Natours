import type { TReview } from '../../../types/review.types'

type TProps = {
  review: TReview
}
const TourReviewCard = ({ review }: TProps) => {
  return (
    <div>
      TourReviewCard
      {JSON.stringify(review)}
    </div>
  )
}

export default TourReviewCard
