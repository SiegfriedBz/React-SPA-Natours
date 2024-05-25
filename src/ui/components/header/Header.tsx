import { useLocation } from 'react-router'
import { useLogout } from '../../../feature/auth/hooks/useAuth'
import useModal from '../modal/hooks/useModal'
import ModalProvider from '../modal/Modal'
import Logo from './Logo'
import HeaderSearchButton from './HeaderSearchButton'
import HeaderNav from './HeaderNav'
import HeaderAuthNav from './HeaderAuthNav'
import BurgerMenuButton from './BurgerMenuButton'
import SVGIcon from '../SVGIcon'
import useUserStore from '../../../feature/user/store/user.store'

const Header = () => {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

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

      {/* MAX:XL MENU: BurgerMenuButton + Modal Nav */}
      <div className="xl:hidden ml-4">
        <ModalProvider>
          <ModalProvider.OpenButton
            windowNameToOpen="max-xl-nav"
            className="max-sm:h-12 max-sm:w-12
              max-md:h-14 max-md:w-14
              md:h-16 md:w-16
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
              className="h-[100svh]
                w-full
                flex flex-col items-center justify-center
                mx-auto 
                pb-4
                font-semibold
                opacity-90
                rounded-xl
                ring-2 ring-stone-300
                u-bg-gradient-stone-light
              "
            >
              <HeaderNavWithCloseModal />
              <LogoutButtonWithCloseModal />
            </div>
          </ModalProvider.Window>
        </ModalProvider>
      </div>
    </header>
  )
}

export default Header

const HeaderNavWithCloseModal = () => {
  const { closeWindow } = useModal()

  return <HeaderNav closeModal={closeWindow} />
}

/* Logout button on SMALL screens */
const LogoutButtonWithCloseModal = () => {
  const user = useUserStore((state) => state.user)
  const { closeWindow } = useModal()

  const { mutate } = useLogout()

  const handleLogout = () => {
    mutate()
    closeWindow()
  }

  if (!user) return null

  return (
    <button
      onClick={handleLogout}
      className="mt-8 w-44 
        mx-auto 
        pl-16
        flex justify-between items-center
        u-text-gradient-primary
        text-lg capitalize
      "
    >
      <span>Logout</span>
      <SVGIcon
        width="1.5rem"
        height="1.5rem"
        iconName="log-out"
        color="#43a263"
      />
    </button>
  )
}
