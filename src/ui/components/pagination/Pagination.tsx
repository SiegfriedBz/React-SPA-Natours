import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetAllTours } from '../../../feature/tour/hooks/useGetAllTours'
import RefetchButton from '../RefetchButton'
import PaginationButton from './PaginationButton'

type TProps = {
  handleScrollToTours: () => void
}
const Pagination = ({ handleScrollToTours }: TProps) => {
  // Use URL query params to get & set the current & next pages
  const [searchParams, setSearchParams] = useSearchParams()
  // Convert the URL search params into a plain JS object with key-value pairs.
  const params = Object.fromEntries(searchParams.entries())

  // Get number of tours for NEXT page
  const {
    nextPageResult: { dataCount, isLoading, isError, refetch }
  } = useGetAllTours()

  // Initial 1st page load
  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ ...params, page: '1' })
    }
  }, [searchParams, setSearchParams, params])

  const currentPage = searchParams.get('page') || '1'
  const showPrevPageBtn = parseInt(currentPage, 10) > 1

  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  const showNextPageBtn = dataCount && dataCount > 0

  const handleClickPrevPage = () => {
    if (!showPrevPageBtn) return

    handleScrollToTours()
    const prevPage = parseInt(currentPage, 10) - 1

    setSearchParams({ ...params, page: String(prevPage) })
  }
  const handleClickNextPage = () => {
    if (!showNextPageBtn) return

    handleScrollToTours()
    const nextPage = parseInt(currentPage, 10) + 1

    setSearchParams({ ...params, page: String(nextPage) })
  }

  return (
    <div className="flex w-full justify-between mb-2">
      <div className={`${showPrevPageBtn ? 'flex items-center' : 'hidden'}`}>
        <PaginationButton
          onClick={handleClickPrevPage}
          disabled={isLoading}
          direction="prev"
          pageNumber={parseInt(currentPage, 10) - 1}
        />
      </div>

      <div
        className={`${showNextPageBtn ? 'ml-auto flex items-center' : 'hidden'}`}
      >
        <PaginationButton
          onClick={handleClickNextPage}
          disabled={isLoading}
          pageNumber={parseInt(currentPage, 10) + 1}
        />
      </div>
    </div>
  )
}

export default Pagination
