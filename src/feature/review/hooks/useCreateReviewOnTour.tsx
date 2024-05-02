import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { createReviewOnTour } from '../../../service/review.service'
import type { TCreateReviewInput } from '../zod/review.zod'

export function useCreateReviewOnTour() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (inputData: TCreateReviewInput) => {
      return createReviewOnTour(inputData)
    },
    onSuccess: () => {
      // Invalidate cache keys after mutation
      queryClient.invalidateQueries({ queryKey: ['reviews'] })

      // Notify user
      toast.success('Review created successfully!')
      // Nav to home page
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
