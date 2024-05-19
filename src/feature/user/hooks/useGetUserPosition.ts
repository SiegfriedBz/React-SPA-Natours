import { useState } from 'react'
import { toast } from 'react-toastify'
import useUserStore from '../store/user.store'
import logger from '../../../utils/logger.utils'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const useGetUserPosition = () => {
  const [isLoadingUserPosition, setIsLoadingUserPosition] = useState(false)
  const getUserPosition = useUserStore((state) => state.getUserPosition)

  const handleGetUserPosition = async () => {
    try {
      setIsLoadingUserPosition(true)
      await sleep(1500)
      await getUserPosition()
    } catch (error) {
      const err = error as Error
      logger.info(err)
      toast.error(err.message)
    } finally {
      setIsLoadingUserPosition(false)
    }
  }

  return { isLoadingUserPosition, handleGetUserPosition }
}

export default useGetUserPosition
