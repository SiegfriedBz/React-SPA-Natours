import { useEffect } from 'react'
import { useGetMe } from '../../user/hooks/useGetMe'
import { useUserStore } from '../../user/store/user.store'
import AllMyBookings from '../components/AllMyBookings'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const MyBookings = () => {
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

  return (
    <div>
      <h1>MyBookings page</h1>
      <AllMyBookings />
    </div>
  )
}

export default MyBookings
