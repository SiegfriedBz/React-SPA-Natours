import { Navigate, Outlet, useLocation } from 'react-router'
import useUserStore from '../feature/user/store/user.store'

const ProtectRoute = () => {
  const location = useLocation()
  const user = useUserStore((state) => state.user)

  return user == null ? (
    <Navigate
      to="/login"
      replace={true}
      state={{ prevPathname: location?.pathname }}
    />
  ) : (
    <Outlet />
  )
}

export default ProtectRoute
