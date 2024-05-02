import { Link } from 'react-router-dom'
import { useUserStore } from '../../feature/user/store/user.store'
import { useLogout } from '../../feature/auth/hooks/useAuth'
import { TUser } from '../../types/user.types'

type TLink = {
  to: string
  label: string
}

const BASE_NAV_LINKS: TLink[] = [
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/about',
    label: 'About'
  }
]
const NAV_LINKS_LOGGED_IN: TLink[] = [
  ...BASE_NAV_LINKS,
  {
    to: '/me',
    label: 'My Profile'
  },
  {
    to: '/my-bookings',
    label: 'My Bookings'
  }
]
const NAV_LINKS_ADMIN: TLink[] = [
  ...NAV_LINKS_LOGGED_IN,
  {
    to: '/tours/new',
    label: 'Create Tour'
  },
  {
    to: '/tours/:tourId/update',
    label: 'Update Tour'
  },
  {
    to: '/tours/stats/:year',
    label: 'Monthly Stats'
  }
]

const NAV_LINKS_NOT_LOGGED_IN: TLink[] = [
  ...BASE_NAV_LINKS,
  {
    to: '/login',
    label: 'Login'
  },
  {
    to: '/signup',
    label: 'Signup'
  }
]

const HeaderNav = () => {
  const user: TUser | null = useUserStore((state) => state.user)
  // const hasPrivileges = user && user?.role !== 'user'
  const hasPrivileges = user != null

  const { mutate } = useLogout()

  const handleLogout = () => {
    mutate()
  }

  return (
    <nav className="ml-auto">
      <ul className="flex space-x-4">
        {hasPrivileges ? (
          <>
            {NAV_LINKS_ADMIN.map((link: TLink) => {
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-cy={`nav-item-${
                      link.label === 'Home'
                        ? ''
                        : link.label.toLowerCase().split(' ').join('-')
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <button onClick={handleLogout} data-cy="logout-btn">
              Logout
            </button>
          </>
        ) : user != null ? (
          <>
            {NAV_LINKS_LOGGED_IN.map((link: TLink) => {
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-cy={`nav-item-${
                      link.label === 'Home'
                        ? ''
                        : link.label.toLowerCase().split(' ').join('-')
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <button onClick={handleLogout} data-cy="logout-btn">
              Logout
            </button>
          </>
        ) : (
          NAV_LINKS_NOT_LOGGED_IN.map((link: TLink) => {
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  data-cy={`nav-item-${
                    link.label === 'Home'
                      ? ''
                      : link.label.toLowerCase().split(' ').join('-')
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })
        )}
      </ul>
    </nav>
  )
}

export default HeaderNav
