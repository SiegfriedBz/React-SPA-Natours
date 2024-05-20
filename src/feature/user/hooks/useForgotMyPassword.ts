import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useUserStore from '../store/user.store'
import useModal from '../../../ui/components/modal/hooks/useModal'
import { forgotMyPassword } from '../../../service/user.service'
import type { TForgotMyPasswordInput } from '../zod/user.zodSchema'

export function useForgotMyPassword() {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)
  const { closeWindow } = useModal()

  return useMutation({
    mutationFn: ({ email }: TForgotMyPasswordInput) =>
      forgotMyPassword({ email }),
    onSuccess: (data) => {
      // Set user in UI store state
      setUser(null)
      // Notify user
      toast.success(data?.message)
      // Close modal
      closeWindow()
      // Nav to home page
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
