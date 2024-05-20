import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useUserStore from '../store/user.store'
import { resetMyPassword } from '../../../service/user.service'
import type { TResetMyPasswordInput } from '../zod/user.zodSchema'
import type { TUser } from '../../../types/user.types'

export function useResetMyPassword() {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationFn: ({
      password,
      passwordConfirmation,
      resetPasswordToken
    }: TResetMyPasswordInput) =>
      resetMyPassword({ password, passwordConfirmation, resetPasswordToken }),
    onSuccess: (data) => {
      // Set user in UI store state
      setUser(data?.data?.user as TUser)
      // Notify user
      toast.success('Your password was updated successfully!')
      // Nav to home page
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
