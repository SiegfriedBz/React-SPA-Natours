import useUserStore from '../../../feature/user/store/user.store'
import { useLogout } from '../../../feature/auth/hooks/useAuth'
import LinkSliding from '../LinkSliding'
import { AUTH_NAV_LINKS, type TLink } from './header.constants'
import type { TUser } from '../../../types/user.types'

const HeaderAuthNav = () => {
  const user: TUser | null = useUserStore((state) => state.user)

  const { mutate } = useLogout()

  const handleLogout = () => {
    mutate()
  }

  return (
    <nav className="max-xl:w-full">
      <ul className="flex space-x-4 items-center justify-end">
        {user == null ? (
          AUTH_NAV_LINKS.map((link: TLink) => {
            return (
              <LinkSliding
                layoutId="auth-link"
                key={link.to}
                className={`${link.to === '/login' ? 'max-md:ml-auto md:ml-4' : 'ml-4'}`}
                {...link}
                dataCy={link.dataCy}
              />
            )
          })
        ) : (
          <LinkSliding
            onClick={handleLogout}
            label="Logout"
            className="max-md:ml-auto md:ml-4"
            dataCy="logout-btn"
          />
        )}
      </ul>
    </nav>
  )
}

export default HeaderAuthNav
