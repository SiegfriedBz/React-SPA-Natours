import { twMerge } from 'tailwind-merge'
import useUserStore from '../store/user.store'
import userDefaultImage from '../../../assets/user/default.jpg'
import type { TUser } from '../../../types/user.types'

const API_PUBLIC_URL = import.meta.env.VITE_API_PUBLIC_URL

type TProps = {
  className?: string
}

const UserAvatar = ({ className = '' }: TProps) => {
  const user: TUser | null = useUserStore((state) => state.user)

  return (
    <img
      src={
        user?.photo
          ? `${API_PUBLIC_URL}/img/users/${user.photo}`
          : userDefaultImage
      }
      alt="user profile"
      className={twMerge(
        `rounded-full object-cover 
          max-sm:w-12
          max-sm:h-12
          sm:w-16 sm:h-16 
      `,
        className
      )}
    />
  )
}

export default UserAvatar
