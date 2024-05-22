import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import useUserStore from '../../../feature/user/store/user.store'
import useModal from '../modal/hooks/useModal'
import ModalProvider from '../modal/Modal'
import Logo from './Logo'
import HeaderSearchButton from './HeaderSearchButton'
import HeaderNav from './HeaderNav'
import HeaderAuthNav from './HeaderAuthNav'
import UserAvatar from '../../../feature/user/components/UserAvatar'
import BurgerMenuButton from './BurgerMenuButton'
import type { TUser } from '../../../types/user.types'

const Header = () => {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'
  const user: TUser | null = useUserStore((state) => state.user)

  return (
    <header>
      <Logo />

      {isHomePage && <HeaderSearchButton />}

      {/* XL MENU */}
      <div data-cy="desktop-nav" className="max-xl:hidden xl:w-full">
        <HeaderNav />
      </div>

      {/* Auth MENU */}
      <HeaderAuthNav />

      {/* MAX:XL MENU */}
      <div className="xl:hidden ml-4">
        <ModalProvider>
          <ModalProvider.OpenButton
            windowNameToOpen="max-xl-nav"
            className="h-12 w-12
              flex 
              items-center 
              rounded-full 
              p-2 
              ring-2 
            ring-stone-100
            "
          >
            <BurgerMenuButton />
          </ModalProvider.OpenButton>
          <ModalProvider.Window
            isFullHeight={true}
            windowNameToOpen="max-xl-nav"
          >
            <div
              data-cy="mobile-nav"
              className="h-full w-full
                flex items-center justify-center
                mx-auto 
                py-8
                font-semibold
                opacity-90
                rounded-xl
                ring-2 ring-stone-300
                u-bg-gradient-stone-light
              "
            >
              <HeaderNavWithCloseModal />
            </div>
          </ModalProvider.Window>
        </ModalProvider>
      </div>

      {/* UserAvatar */}
      {user != null && (
        <div
          className="flex justify-center items-center
            max-sm:min-w-[3.5rem] max-sm:min-h-[3.5rem]
            sm:min-w-16 sm:min-h-16
            max-xl:ml-4 
            xl:ml-8
          "
        >
          <Link to="/me">
            <UserAvatar
              className="
              max-sm:w-12
              max-sm:h-12 
              sm:w-16 sm:h-16 
              ring-2 
              ring-primary-light
            "
            />
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header

const HeaderNavWithCloseModal = () => {
  const { closeWindow } = useModal()

  return <HeaderNav closeModal={closeWindow} />
}
