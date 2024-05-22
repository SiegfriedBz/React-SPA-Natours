import { useEffect } from 'react'
import { useGetMe } from '../hooks/useGetMe'
import useUserStore from '../store/user.store'
import UpdateMeForm from '../components/forms/UpdateMeForm'
import UpdateMyPasswordForm from '../components/forms/UpdateMyPasswordForm'
import DeleteMe from '../components/DeleteMe'
import RefetchButton from '../../../ui/components/RefetchButton'
import SkeletonForm from '../../../ui/components/skeleton/FormSkeletton'
import type { TUser } from '../../../types/user.types'

const UserProfile = () => {
  const currentUser = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const { data, refetch, isError, isLoading } = useGetMe()

  // use currentUser if exists or data from useGetMe hook
  useEffect(() => {
    if (currentUser || data?.data?.user == null) return

    // update user in ui state after fetch if no currentUser
    setUser(data?.data?.user)
  }, [currentUser, setUser, data?.data?.user])

  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  const user: TUser = currentUser || data?.data?.user

  return (
    <>
      <h1 className="h1">My Profile</h1>
      {isLoading ? (
        <SkeletonForm />
      ) : (
        <>
          <UpdateMeForm user={user} />
          <UpdateMyPasswordForm />
          <DeleteMe />
        </>
      )}
    </>
  )
}

export default UserProfile
