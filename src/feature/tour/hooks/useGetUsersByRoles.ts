import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../../service/admin.users.service'
import type { TUser } from '../../../types/user.types'

type TProps = {
  roles?: TUser['role'][]
}

export function useGetUsersByRoles({ roles }: TProps) {
  let queryString = ''

  if (roles && roles?.length > 0) {
    const params = new URLSearchParams()
    roles.forEach((role) => params.append('role', role))

    queryString = params.toString()
  }

  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: ['users', `users-${queryString}`],
      queryFn: () => {
        return getUsers({ query: queryString })
      }
    })

  return { data, refetch, status, isPending, isSuccess, isError, isLoading }
}
