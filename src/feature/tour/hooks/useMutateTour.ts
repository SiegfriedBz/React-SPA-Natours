import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { mutateTour } from '../../../service/tour.service'
import type { TCreateTourInput, TUpdateTourInput } from '../zod/tour.zodSchema'

type TProps = { tourId?: string }

export function useMutateTour({ tourId }: TProps = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (tourData: TCreateTourInput | TUpdateTourInput) =>
      tourId
        ? mutateTour({ ...tourData, tourId } as TUpdateTourInput & {
            tourId: string
          })
        : mutateTour(tourData as TCreateTourInput),

    onSuccess: () => {
      // Invalidate cache keys after mutation
      queryClient.invalidateQueries({ queryKey: ['tours', `tours-${tourId}`] })
      // Notify user
      toast.info(`Tour ${tourId ? 'updated' : 'created'} successfully`)
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
