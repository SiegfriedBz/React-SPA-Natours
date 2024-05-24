import { useCallback } from 'react'
import { Outlet, ScrollRestoration, useMatch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import 'react-toastify/dist/ReactToastify.css'

const AppLayout = () => {
  const { isHomePage, isToursPage, isLoginOrSignupPage, isBookingsPage } =
    useMatchPage()
  const { getPageClasses } = usePageClasses({
    isToursPage,
    isLoginOrSignupPage,
    isBookingsPage
  })

  return (
    <div
      className="grid grid-rows-[max-content_1fr_max-content]
        container mx-auto
      "
    >
      <Header />
      <main className={getPageClasses()}>
        <Outlet />
      </main>

      <Footer />
      <ToastContainer />

      {!isHomePage && <ScrollRestoration />}
    </div>
  )
}

export default AppLayout

const useMatchPage = () => {
  const matchHome = !!useMatch('/')
  const matchTours = !!useMatch('/tours')
  const matchTourId = !!useMatch('/tours/:tourId')
  const matchCreate = !!useMatch('/tours/new')
  const matchUpdate = !!useMatch('/tours/:id/update')
  const matchInsights = !!useMatch('/tours/insights')
  const matchPlanning = !!useMatch('/tours/planning')
  const isLoginPage = !!useMatch('/login')
  const isSignupPage = !!useMatch('/signup')
  const isBookingsPage = !!useMatch('/my-bookings')

  const isHomePage = matchHome || matchTours
  const isToursPage =
    (isHomePage || matchTourId) &&
    !matchCreate &&
    !matchUpdate &&
    !matchInsights &&
    !matchPlanning
  const isLoginOrSignupPage = isLoginPage || isSignupPage

  return { isHomePage, isToursPage, isLoginOrSignupPage, isBookingsPage }
}

type TUsePageClassesProps = {
  isToursPage: boolean
  isLoginOrSignupPage: boolean
  isBookingsPage: boolean
}
const usePageClasses = ({
  isToursPage,
  isLoginOrSignupPage,
  isBookingsPage
}: TUsePageClassesProps) => {
  const getClassesForLoginOrSignupPage = useCallback(() => {
    const innerWidth = window.innerWidth
    const upToXs = innerWidth < 404
    const xsToSm = !upToXs && innerWidth < 640

    const minHeightClass = upToXs
      ? ''
      : xsToSm
        ? 'min-h-[calc(100vh-calc(2*var(--header-h)))]'
        : 'min-h-[calc(100vh-var(--header-h))]'

    return `max-md:my-4 md:my-8 ${minHeightClass} `
  }, [])

  const getPageClasses = useCallback(() => {
    if (isToursPage) return ''
    if (isLoginOrSignupPage) return getClassesForLoginOrSignupPage()
    if (isBookingsPage)
      return 'min-h-[calc(100vh-var(--header-h))] max-sm:my-4 max-md:my-8 md:my-12'
    return 'max-sm:my-4 max-md:my-8 md:my-12'
  }, [
    isToursPage,
    isLoginOrSignupPage,
    isBookingsPage,
    getClassesForLoginOrSignupPage
  ])

  return { getPageClasses }
}
