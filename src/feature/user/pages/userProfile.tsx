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
  const setUser = useUserStore((state) => state.setUser)

  const { data, refetch, isError, isLoading } = useGetMe()

  useEffect(() => {
    if (data?.data?.user == null) return

    // update user in ui state after fetch
    setUser(data?.data?.user)
  }, [setUser, data?.data?.user])

  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  const user: TUser = data?.data?.user

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
