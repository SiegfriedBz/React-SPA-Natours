import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { mutateTour } from '../../../service/tour.service'
import type { TCreateTourInput, TUpdateTourInput } from '../zod/tour.zodSchema'

type TProps = { tourId?: string }

export function useMutateTour({ tourId }: TProps = {}) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (tourData: TCreateTourInput | TUpdateTourInput) =>
      tourId
        ? mutateTour({ ...tourData, tourId } as TUpdateTourInput & {
            tourId: string
          })
        : mutateTour(tourData as TCreateTourInput),

    onSuccess: (data) => {
      const createdTourId = data?.data?.tour?._id

      // Invalidate cache keys after mutation
      queryClient.invalidateQueries({ queryKey: ['tour', `${tourId}`] })
      // Notify user
      toast.info(`Tour ${tourId ? 'updated' : 'created'} successfully`)

      // Redirect  after mutation
      tourId
        ? navigate(`/tours/${tourId}`)
        : navigate(`/tours/${createdTourId}`)
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
