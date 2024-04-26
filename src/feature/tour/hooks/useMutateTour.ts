import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { mutateTour } from '../../../service/tour.service'
import type { TCreateTourInput, TUpdateTourInput } from '../zod/tour.zodSchema'

export function useMutateTour() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (tourData: TCreateTourInput | TUpdateTourInput) =>
      '_id' in tourData
        ? mutateTour(tourData as TUpdateTourInput)
        : mutateTour(tourData as TCreateTourInput),

    onSuccess: (_, variables) => {
      // Invalidate cache keys after mutation
      queryClient.invalidateQueries({ queryKey: ['tours'] })
      // Notify user
      toast.info(
        `Tour ${'_id' in variables ? 'updated' : 'created'} successfully`
      )
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
