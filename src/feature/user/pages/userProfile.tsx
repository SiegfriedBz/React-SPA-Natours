import { useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import UpdateMeForm from '../components/UpdateMeForm'
import UpdateMyPasswordForm from '../components/UpdateMyPasswordForm'
import { useGetMe } from '../hooks/useGetMe'
import { useUserStore } from '../store/user.store'
import type { TUser } from '../../../types/user.types'
import DeleteMe from '../components/DeleteMe'

const UserProfile = () => {
  const setUser = useUserStore((state) => state.setUser)

  const {
    data,
    refetch,
    // status, isPending, isSuccess,
    isError,
    isLoading
  } = useGetMe()

  useEffect(() => {
    if (data?.data?.user == null) return

    // update user in ui state after fetch
    setUser(data?.data?.user)
  }, [setUser, data?.data?.user])

  if (isLoading) {
    return (
      <div>
        <div className="h-56 w-64">
          <SkeletonTheme baseColor="#55c57a" highlightColor="#43a263">
            <p>
              <Skeleton count={3.5} containerClassName="flex-1" />
            </p>
          </SkeletonTheme>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <div>Error fetching data</div>
        <button type="button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    )
  }

  const user: TUser = data?.data?.user

  return (
    <div>
      UserProfile
      <UpdateMeForm user={user} />
      <UpdateMyPasswordForm />
      <DeleteMe />
    </div>
  )
}

export default UserProfile
