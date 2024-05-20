import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useUserStore from '../store/user.store'
import { deleteMe } from '../../../service/user.service'

const useDeleteMe = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationFn: () => deleteMe(),
    onSuccess: () => {
      // Set user in UI store state
      setUser(null)
      // Notify user
      toast.info('Your profile was deleted successfully.')
      // Nav to home page
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}

export default useDeleteMe
