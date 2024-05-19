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
      className="relative 
        max-sm:min-w-10 max-sm:min-h-10 
        sm:min-w-12 sm:min-h-12 
        max-sm:ml-3 sm:ml-4 
        btn-sm btn-primary 
        rounded-full
      "
      type="button"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-10 w-10 flex items-center justify-center">
        <SVGIcon iconName="search" color="#f5f5f4" />
      </div>
    </button>
  )
}

export default HeaderSearchButton
