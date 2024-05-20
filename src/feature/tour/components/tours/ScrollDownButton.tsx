import SVGIcon from '../../../../ui/components/SVGIcon'

type TProps = {
  handleScrollToTours: () => void
}
const ScrollDownButton = ({ handleScrollToTours }: TProps) => {
  return (
    <button
      onClick={handleScrollToTours}
      className="relative max-sm:min-w-10 max-sm:min-h-10 sm:min-w-12 sm:min-h-12 btn-sm btn-primary rounded-full"
      type="button"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-10 w-10 flex items-center justify-center">
        <SVGIcon iconName="arrow-down" color="#f5f5f4" />
      </div>
    </button>
  )
}

export default ScrollDownButton
