import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { signup } from '../../../service/user.service'
import type { TSignupInput } from '../zod/user.zodSchema'

/**
 * Custom hook for signing up a user.
 * @returns A mutation function that can be used to sign up a user.
 */
export function useSignup() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userSignupData: TSignupInput) => signup(userSignupData),
    onSuccess: () => {
      // Invalidate cache keys after mutation
      queryClient.invalidateQueries({ queryKey: ['user'] })

      // Notify user
      toast.success('You signed up successfully!')
      // Nav to home page
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
