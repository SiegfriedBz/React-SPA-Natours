import { twMerge } from 'tailwind-merge'
import SVGIcons from '../../assets/icons.svg'

const DEFAULT_SIZE = '1.35rem'
const DEFAULT_COLOR = '#55c57a'

type TSVGIconProps = {
  iconName: string
  color?: string
  width?: string
  height?: string
  className?: string
  wrapperClassName?: string
}

const SVGIcon = ({
  iconName,
  color = DEFAULT_COLOR,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  className = '',
  wrapperClassName = ''
}: TSVGIconProps) => {
  return (
    <span className={twMerge('flex items-center', wrapperClassName)}>
      <svg fill={color} width={width} height={height} className={className}>
        <use href={`${SVGIcons}#icon-${iconName}`}></use>
      </svg>
    </span>
  )
}

export default SVGIcon

type TSVGStarIconProps = {
  variant?: 'sm' | undefined
  className?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const SVGStarIcon = ({
  variant,
  className = '',
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {}
}: TSVGStarIconProps) => {
  return (
    <svg
      className={`mr-1 ${variant === 'sm' ? 'max-md:h-6 max-md:w-6 h-8 w-8' : 'h-8 w-8'} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <use href={`${SVGIcons}#icon-star`}></use>
    </svg>
  )
}
