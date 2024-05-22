import { Outlet, ScrollRestoration, useMatch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import 'react-toastify/dist/ReactToastify.css'

const AppLayout = () => {
  const matchHome = useMatch('/')
  const matchTours = useMatch('/tours')
  const matchTourId = useMatch('/tours/:tourId')
  const matchCreate = useMatch('/tours/new')
  const matchUpdate = useMatch('/tours/:id/update')
  const matchInsights = useMatch('/tours/insights')
  const matchPlanning = useMatch('/tours/planning')

  const isHomePage = matchHome || matchTours
  const isToursPage =
    (isHomePage || matchTourId) &&
    !matchCreate &&
    !matchUpdate &&
    !matchInsights &&
    !matchPlanning

  return (
    <div
      className="grid grid-rows-[max-content_1fr_max-content]
        container mx-auto
      "
    >
      <Header />

      <main
        className={`
          min-h-[calc(100vh-var(--header-h))] 
          ${isToursPage ? '' : 'max-sm:my-4 max-md:my-8 md:my-12'}`}
      >
        <Outlet />
      </main>

      <Footer />
      <ToastContainer />

      {!isHomePage && <ScrollRestoration />}
    </div>
  )
}

export default AppLayout
