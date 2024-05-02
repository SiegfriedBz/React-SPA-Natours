import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import { toast } from 'react-toastify'
import { useUserStore } from '../feature/user/store/user.store'
import type { TUserRole } from '../types/user.types'

type TProps = {
  authorizedRoles: TUserRole[]
}

const RestrictTo = (
  { authorizedRoles }: TProps = { authorizedRoles: ['user'] }
) => {
  const user = useUserStore((state) => state.user)
  const userRole = user?.role

  useEffect(() => {
    ;(!userRole || !authorizedRoles.includes(userRole)) &&
      toast.warning(
        `This resource needs ${authorizedRoles.join(', ')} privileges`
      )
  }, [authorizedRoles, userRole])

  return !userRole || !authorizedRoles.includes(userRole) ? (
    <Navigate replace={true} to="/" />
  ) : (
    <Outlet />
  )
}

export default RestrictTo
