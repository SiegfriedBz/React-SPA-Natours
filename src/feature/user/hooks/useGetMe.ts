import { useQuery } from '@tanstack/react-query'
import { getMe } from '../../../service/user.service'

export function useGetMe() {
  const { status, isPending, isSuccess, isError, isLoading, data, refetch } =
    useQuery({
      queryKey: ['user'],
      queryFn: getMe
    })

  return { data, refetch, status, isPending, isSuccess, isError, isLoading }
}
