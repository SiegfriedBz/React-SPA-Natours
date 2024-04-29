import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { forgotMyPassword } from '../../../service/user.service'
import type { TForgotMyPasswordInput } from '../zod/user.zodSchema'

export function useForgotMyPassword() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ email }: TForgotMyPasswordInput) =>
      forgotMyPassword({ email }),
    onSuccess: (data) => {
      // Notify user
      toast.success(data?.message)
      // Nav to home page
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
