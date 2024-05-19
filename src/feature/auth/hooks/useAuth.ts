import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useUserStore from '../../user/store/user.store'
import { login, logout } from '../../../service/auth.service'
import type { TLoginInput } from '../zod/auth.zodSchema'
import type { TUser } from '../../../types/user.types'

type TProps = {
  prevPathname?: string
}
export function useLogin({ prevPathname }: TProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationFn: ({ email, password }: TLoginInput) =>
      login({ email, password }),
    onSuccess: (data) => {
      // Invalidate cache keys after mutation
      queryClient.invalidateQueries({ queryKey: ['user'] })

      // Set user in UI store state
      setUser(data?.data?.user as TUser)

      // Notify user
      toast.success('You logged in successfully!')

      // Nav to previous page pr home page
      prevPathname ? navigate(`${prevPathname}`) : navigate('/')
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
      // Nav to home page
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
