import { Analytics } from '@vercel/analytics/react'
import { useCallback } from 'react'
import { Outlet, ScrollRestoration, useMatch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomErrorBoundary from '../components/CustomErrorBoundary'
import Footer from '../components/Footer'
import Header from '../components/header/Header'

const AppLayout = () => {
  const {
    isHomePage,
    isToursPage,
    isLoginOrSignupPage,
    isBookingsPage,
    isAboutPage
  } = useMatchPage()
  const { getPageClasses } = usePageClasses({
    isToursPage,
    isLoginOrSignupPage,
    isBookingsPage,
    isAboutPage
  })

  return (
    <div
      className="grid grid-rows-[max-content_1fr_max-content]
        container mx-auto
      "
    >
      <Header />

      <main className={getPageClasses()}>
        <CustomErrorBoundary>
          <Outlet />
        </CustomErrorBoundary>
      </main>

      <Footer />

      <ToastContainer />
      <Analytics />
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
  const isLoginPage = !!useMatch('/login')
  const isSignupPage = !!useMatch('/signup')
  const matchInsights = !!useMatch('/tours/insights')
  const matchPlanning = !!useMatch('/tours/planning')
  const isBookingsPage = !!useMatch('/my-bookings')
  const isAboutPage = !!useMatch('/about')

  const isHomePage = matchHome || matchTours
  const isToursPage =
    (isHomePage || matchTourId) &&
    !matchCreate &&
    !matchUpdate &&
    !matchInsights &&
    !matchPlanning
  const isLoginOrSignupPage = isLoginPage || isSignupPage

  return {
    isHomePage,
    isToursPage,
    isLoginOrSignupPage,
    isBookingsPage,
    isAboutPage
  }
}

type TUsePageClassesProps = {
  isToursPage: boolean
  isLoginOrSignupPage: boolean
  isBookingsPage: boolean
  isAboutPage: boolean
}
const usePageClasses = ({
  isToursPage,
  isLoginOrSignupPage,
  isBookingsPage,
  isAboutPage
}: TUsePageClassesProps) => {
  const getClassesForLoginOrSignupPage = useCallback(() => {
    const innerWidth = window.innerWidth
    const upToXs = innerWidth < 404
    const xsToSm = !upToXs && innerWidth < 640

    const minHeightClass = upToXs
      ? ''
      : xsToSm
        ? 'min-h-[calc(100svh-calc(2*var(--header-h)))]'
        : 'min-h-[calc(100svh-var(--header-h))]'

    return `max-md:my-4 md:my-8 ${minHeightClass} `
  }, [])

  const getPageClasses = useCallback(() => {
    if (isToursPage) return ''
    if (isLoginOrSignupPage) return getClassesForLoginOrSignupPage()
    if (isBookingsPage || isAboutPage)
      return 'min-h-[calc(100svh-calc(2*var(--header-h)))] max-sm:my-4 max-md:my-8 md:my-12'
    return 'max-sm:my-4 max-md:my-8 md:my-12'
  }, [
    isToursPage,
    isLoginOrSignupPage,
    isBookingsPage,
    isAboutPage,
    getClassesForLoginOrSignupPage
  ])

  return { getPageClasses }
}
