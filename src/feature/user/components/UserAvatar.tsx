import { twMerge } from 'tailwind-merge'
import useUserStore from '../store/user.store'
import userDefaultImage from '../../../assets/user/default.jpg'
import type { TUser } from '../../../types/user.types'

type TProps = {
  className?: string
}

const UserAvatar = ({ className = '' }: TProps) => {
  const user: TUser | null = useUserStore((state) => state.user)

  return (
    <img
      src={user?.photo ? user.photo : userDefaultImage}
      alt="user profile"
      className={twMerge('rounded-full object-cover', className)}
    />
  )
}

export default UserAvatar
