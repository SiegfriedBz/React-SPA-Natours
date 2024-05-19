import useUserStore from '../../../feature/user/store/user.store'
import LinkSliding from '../LinkSliding'
import {
  NAV_LINKS_ADMIN,
  NAV_LINKS_LOGGED_IN,
  NAV_LINKS_NOT_LOGGED_IN,
  type TLink
} from './header.constants'
import type { TUser } from '../../../types/user.types'

type TProps = {
  closeModal?: () => void
}

const HeaderNav = ({ closeModal = () => {} }: TProps) => {
  const user: TUser | null = useUserStore((state) => state.user)
  const userHasPrivileges = user && user?.role !== 'user'

  const LINKS = userHasPrivileges
    ? NAV_LINKS_ADMIN
    : user != null
      ? NAV_LINKS_LOGGED_IN
      : NAV_LINKS_NOT_LOGGED_IN

  return (
    <nav className="w-full">
      <ul
        className=" 
          flex 
          items-center
          justify-end
          max-xl:flex-col 
          max-xl:space-y-8 
          xl:space-x-4
          tracking-wide
          font-semibold
          opacity-85
          z-[99999]
        "
      >
        {LINKS.map((link: TLink) => {
          return (
            <LinkSliding
              key={link.to}
              onClick={closeModal}
              {...link}
              dataCy={link.dataCy}
            />
          )
        })}
      </ul>
    </nav>
  )
}

export default HeaderNav
