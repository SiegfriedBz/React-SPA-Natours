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
  return (
    <button
      data-cy={`${direction}-page-btn`}
      disabled={disabled}
      onClick={onClick}
      className={`text-primary
        flex items-center ${direction === 'prev' ? 'flex-row-reverse' : ''}

        pl-1 pr-1
        hover:text-stone-700
        transition
        duration-300
        ease-in-out
      `}
    >
      <SVGIcon
        width="2.75rem"
        height="2.75rem"
        iconName={`arrow-${direction === 'prev' ? 'left' : 'right'}-circle`}
        color="currentColor"
      />
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
