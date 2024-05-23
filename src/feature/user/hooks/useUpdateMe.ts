import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateMe } from '../../../service/user.service'
import type { TUpdateMeInput } from '../zod/user.zodSchema'
import useUserStore from '../store/user.store'

export function useUpdateMe() {
  const queryClient = useQueryClient()
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationFn: (mutateUserData: TUpdateMeInput) => updateMe(mutateUserData),
    onSuccess: (data) => {
      // Update user in UI store state
      setUser(data.data.user)

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
