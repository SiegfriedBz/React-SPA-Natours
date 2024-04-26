import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { login, logout } from '../../../service/auth.service'
import type { TLoginInput } from '../zod/auth.zodSchema'
import { useUserStore } from '../../user/store/user.store'
import { TUser } from '../../../types/user.types'

export function useLogin() {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationFn: (loginInputData: TLoginInput) => login(loginInputData),
    onSuccess: (data) => {
      // Set user in UI store state
      setUser(data?.data?.user as TUser)
      // Notify user
      toast.success('You logged in successfully!')
      // Nav to home page
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Update UI store state
      setUser(null)
      // Notify user
      toast.info('You logged out successfully')
      // Nav to home page
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
