import { useRef } from 'react'
import SVGIcon from '../SVGIcon'

type TPaginationButtonProps = {
  onClick: () => void
  disabled: boolean
  direction?: 'prev' | 'next'
  pageNumber: number
}

const PaginationButton = ({
  onClick,
  disabled,
  direction = 'next',
  pageNumber
}: TPaginationButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    onClick()
    // Blur button
    if (buttonRef.current) {
      buttonRef.current.blur()
    }
  }

  return (
    <button
      ref={buttonRef}
      data-cy={`${direction}-page-btn`}
      disabled={disabled}
      onClick={handleClick}
      className={`text-primary
        flex items-center ${direction === 'prev' ? 'flex-row-reverse pr-1' : 'pl-1'} 
        focus:text-stone-700
        transition
        duration-300
        ease-in-out
      `}
    >
      <span className="sm:hidden">
        <SVGIcon
          width="1.75rem"
          height="1.75rem"
          iconName={`arrow-${direction === 'prev' ? 'left' : 'right'}-circle`}
          color="currentColor"
        />
      </span>
      <span className="max-sm:hidden">
        <SVGIcon
          width="2.75rem"
          height="2.75rem"
          iconName={`arrow-${direction === 'prev' ? 'left' : 'right'}-circle`}
          color="currentColor"
        />
      </span>

      <span
        className={`
          inline-block 
          text-xl
          font-semibold 
          px-2
        `}
      >
        {pageNumber}
      </span>
    </button>
  )
}

export default PaginationButton
