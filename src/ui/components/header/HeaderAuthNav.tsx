import useUserStore from '../../../feature/user/store/user.store'
import { useLogout } from '../../../feature/auth/hooks/useAuth'
import LinkSliding from '../LinkSliding'
import { AUTH_NAV_LINK, type TLink } from './header.constants'
import type { TUser } from '../../../types/user.types'
import { Link } from 'react-router-dom'
import UserAvatar from '../../../feature/user/components/UserAvatar'

const HeaderAuthNav = () => {
  const user: TUser | null = useUserStore((state) => state.user)

  const { mutate } = useLogout()

  const handleLogout = () => {
    mutate()
  }

  return (
    <nav className="max-xl:w-full">
      <ul className="flex space-x-4 items-center justify-end">
        {user == null &&
          AUTH_NAV_LINK.map((link: TLink) => {
            return (
              <LinkSliding
                layoutId="auth-link"
                key={link.to}
                className="max-md:ml-auto md:ml-4"
                {...link}
                dataCy={link.dataCy}
              />
            )
          })}

        {/* User logged in */}
        {user != null && (
          <>
            {/* Logout button on XL screens */}
            <LinkSliding
              onClick={handleLogout}
              label="Logout"
              className="max-xl:hidden xl:ml-4"
              dataCy="logout-btn"
            />

            {/* UserAvatar */}
            <Link
              to="/me"
              className="
                  max-sm:h-10 max-sm:w-10
                  max-md:h-12 max-md:w-12
                  md:h-14 md:w-14"
            >
              <UserAvatar
                className="
                  max-sm:h-10 max-sm:w-10
                  max-md:h-12 max-md:w-12
                  md:h-14 md:w-14 
                  ring-2 
                  ring-primary-light
                "
              />
            </Link>
          </>
        )}
      </ul>
    </nav>
  )
}

export default HeaderAuthNav
