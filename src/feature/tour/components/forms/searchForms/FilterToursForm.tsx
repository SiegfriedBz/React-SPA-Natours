import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Select, { MultiValue } from 'react-select'
import { toast } from 'react-toastify'
import useModal from '../../../../../ui/components/modal/hooks/useModal'
import logger from '../../../../../utils/logger.utils'
import SVGIcon from '../../../../../ui/components/SVGIcon'
import colourStyles from '../../../../../ui/utils/reactSelectStyles.utils'
import SelectDifficulty from '../SelectDifficulty'
import type { TSelectOption } from './types'

const sortByOptions: TSelectOption[] = [
  { value: 'price', label: 'Price' },
  { value: 'duration', label: 'Duration' },
  { value: '-ratingsAverage', label: 'Rating' }
]

export const FilterToursForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { closeWindow } = useModal()
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<TSelectOption | null>(null)
  const [selectedSortBy, setSelectedSortBy] = useState<
    MultiValue<TSelectOption>
  >([])

  const currentPage = searchParams.get('page') || '1'
  const handleClear = () => {
    setSelectedDifficulty(null)
    setSelectedSortBy([])
    setSearchParams({ page: currentPage })
    // Close modal
    closeWindow()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedDifficulty && selectedSortBy.length === 0) {
      toast.info('Please fill in all fields')
      return
    }

    try {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        ...(selectedDifficulty ? { difficulty: selectedDifficulty.value } : {}),
        ...(selectedSortBy.length > 0
          ? {
              sort: selectedSortBy.map((selected) => selected?.value).join(',')
            }
          : {})
      })

      // Close modal
      closeWindow()
    } catch (error) {
      const err = error as Error
      logger.info(err)
      toast.error(err.message)
    }
  }

  return (
    <form data-cy="filter-tours-form" className="m-0" onSubmit={handleSubmit}>
      <h2 className="h2 flex space-x-2">
        <SVGIcon iconName="filter" />
        <span>Filter tours</span>
      </h2>

      <div className="flex flex-col space-y-2">
        <div>
          <SelectDifficulty
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
          />
        </div>

        {/* sort by */}
        <div>
          <label htmlFor="sort">Sort by</label>
          <Select<TSelectOption, true>
            styles={colourStyles<TSelectOption>()}
            name="sort"
            id="sort"
            isMulti={true}
            defaultValue={selectedSortBy}
            onChange={setSelectedSortBy}
            options={sortByOptions}
            isClearable={true}
          />
        </div>
      </div>

      <div className="flex my-2 space-x-4">
        <button
          onClick={handleClear}
          className="group btn-sm btn-secondary u-scale-sm btn-submit"
          type="button"
        >
          <div className="h-8 flex items-center space-x-2">
            <SVGIcon
              wrapperClassName="text-stone-700 group-hover:text-primary-light"
              iconName="x-circle"
              color="currentColor"
            />
            <span className="text-sm">Clear</span>
          </div>
        </button>

        <button className="btn-sm btn-primary btn-submit" type="submit">
          <div className="h-8 text-stone-50 flex items-center space-x-2">
            <SVGIcon iconName="search" color="#f5f5f4" />
            <span className="text-sm text-stone-50">Filter</span>
          </div>
        </button>
      </div>
    </form>
  )
}
