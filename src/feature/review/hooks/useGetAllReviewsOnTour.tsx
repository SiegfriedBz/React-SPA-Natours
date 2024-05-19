import { useQuery } from '@tanstack/react-query'
import { getAllReviewsOnTour } from '../../../service/review.service'

type TProps = {
  tourId: string
}

export function useGetAllReviewsOnTour({ tourId }: TProps) {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: ['reviews-for-tour', tourId],
      queryFn: () => getAllReviewsOnTour(tourId)
    })

  return { data, refetch, status, isPending, isSuccess, isError, isLoading }
}
