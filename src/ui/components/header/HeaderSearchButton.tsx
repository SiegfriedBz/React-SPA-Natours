import { useShowSearchFormsButtons } from '../../../feature/tour/store/useShowSearchFormsButtons'
import SVGIcon from '../SVGIcon'

const HeaderSearchButton = () => {
  const {
    searchFormsButtonsVisible,
    showSearchFormsButtons,
    hideSearchFormsButtons
  } = useShowSearchFormsButtons()

  return (
    <button
      data-cy="header-search-button"
      onClick={
        searchFormsButtonsVisible
          ? hideSearchFormsButtons
          : showSearchFormsButtons
      }
      className="max-sm:h-9 max-sm:w-9
        max-md:h-10 max-md:w-10
        md:h-12 md:w-12
        max-sm:ml-3 sm:ml-4 
        btn-sm btn-primary 
        rounded-full
      "
      type="button"
    >
      <div
        className="relative
         top-1/2 -translate-y-1/2 
         left-1/2 -translate-x-1/2 
         max-sm:h-8 max-sm:w-8
         max-md:h-10 max-md:w-10
         md:h-12 md:w-12
         flex items-center justify-center
         rounded-full"
      >
        <SVGIcon iconName="search" color="#f5f5f4" />
      </div>
    </button>
  )
}

export default HeaderSearchButton
