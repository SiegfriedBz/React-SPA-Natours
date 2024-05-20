import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { motion } from 'framer-motion'
import SVGIcon from './SVGIcon'

type TProps = {
  layoutId?: string
  label: string
  icon?: string
  to?: string
  onClick?: () => void
  as?: 'btn' | undefined
  className?: string
  dataCy?: string
}

const LinkSliding = ({
  layoutId = 'header-top-nav-links',
  label,
  icon,
  to,
  onClick = () => {},
  as,
  className = '',
  dataCy = ''
}: TProps) => {
  const { pathname } = useLocation()
  const isActive = pathname === to
  const isBigScreen = window.innerWidth > 1280

  return (
    <>
      <li
        className={`${className} relative 
          flex items-center
          h-full 
          max-xl:text-xl
          xl:text-lg
          ${
            isActive
              ? `u-text-gradient-primary
                `
              : 'max-xl:text-stone-700 xl:text-stone-300'
          }
          xl:hover:u-text-gradient-primary-light
          u-transition 
      `}
      >
        <>
          {icon && !isBigScreen && (
            <>
              <SVGIcon
                iconName={icon}
                wrapperClassName={`xl:hidden
                  ${isActive ? 'text-primary-light' : 'text-stone-700'}`}
                color="currentColor"
                width="1.75rem"
                height="1.75rem"
              />
            </>
          )}
          <div className="max-2xl:ml-2 2xl:ml-4 flex justify-center">
            {to ? (
              <Link
                data-cy={dataCy}
                to={to}
                className={
                  as === 'btn'
                    ? 'btn-sm btn-transparent-text-primary-ring-primary'
                    : 'text-center'
                }
                onClick={onClick}
              >
                <span>{label}</span>
              </Link>
            ) : (
              <button
                data-cy={dataCy}
                className="btn-sm 
                  btn-transparent-text-primary-ring-primary"
                onClick={onClick}
              >
                {label}
              </button>
            )}
            {isActive ? (
              <motion.div
                layoutId={isBigScreen ? 'header-top-nav-links' : layoutId}
                className={`absolute 
                  u-bg-gradient-primary-light
                  ${isBigScreen ? 'w-full' : 'w-3/4'} h-[0.25rem] 
                  rounded-lg
                  ${
                    as === 'btn'
                      ? '-bottom-[1rem]'
                      : 'max-xl:-bottom-2 xl:-bottom-[1.4rem]'
                  }`}
              />
            ) : null}
          </div>
        </>
      </li>
    </>
  )
}

export default LinkSliding
