import { Link } from 'react-router-dom'
import { useUserStore } from '../../feature/user/store/user.store'
import { useLogout } from '../../feature/auth/hooks/useAuth'

type TLink = {
  to: string
  label: string
}
const NAV_LINKS: TLink[] = [
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/login',
    label: 'Login'
  },
  {
    to: '/signup',
    label: 'Signup'
  },
  {
    to: '/about',
    label: 'About'
  }
]

const HeaderNav = () => {
  const user = useUserStore((state) => state.user)
  const { mutate } = useLogout()

  const handleLogout = () => {
    mutate()
  }

  return (
    <nav className="ml-auto">
      <ul className="flex space-x-4">
        {NAV_LINKS.map((link: TLink) => {
          return link.label.toLowerCase() === 'login' && user != null ? (
            <button key={link.to} onClick={handleLogout} data-cy="logout-btn">
              Logout
            </button>
          ) : (
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
      </ul>
    </nav>
  )
}

export default HeaderNav
