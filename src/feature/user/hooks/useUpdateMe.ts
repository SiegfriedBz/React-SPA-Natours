import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateMe } from '../../../service/user.service'
import type { TUpdateMeInput } from '../zod/user.zodSchema'

export function useUpdateMe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (mutateUserData: TUpdateMeInput) => updateMe(mutateUserData),
    onSuccess: () => {
      // Invalidate cache keys after mutation
      queryClient.invalidateQueries({ queryKey: ['user'] })

      // Notify user
      toast.success('Your profile was updated successfully!')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
