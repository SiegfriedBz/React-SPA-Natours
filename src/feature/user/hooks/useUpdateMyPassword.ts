import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateMyPassword } from '../../../service/user.service'
import type { TUpdateMyPasswordInput } from '../zod/user.zodSchema'

export function useUpdateMyPassword() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (mutateUserData: TUpdateMyPasswordInput) =>
      updateMyPassword(mutateUserData),
    onSuccess: () => {
      // Invalidate cache keys after mutation
      queryClient.invalidateQueries({ queryKey: ['user'] })

      // Notify user
      toast.success('Your password was updated successfully!')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
