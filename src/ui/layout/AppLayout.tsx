import { Outlet, ScrollRestoration, useMatch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import 'react-toastify/dist/ReactToastify.css'

const AppLayout = () => {
  const matchHome = useMatch('/')
  const matchTours = useMatch('/tours')
  const matchTourId = useMatch('/tours/:tourId')
  const matchCreateTour = useMatch('/tours/new')
  const matchTourUpdate = useMatch('/tours/:id/update')
  const matchToursStats = useMatch('/tours/stats')

  const isHomePage = matchHome || matchTours
  const isToursPage =
    (isHomePage || matchTourId) &&
    !matchToursStats &&
    !matchCreateTour &&
    !matchTourUpdate

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
          ${isToursPage ? '' : 'max-sm:my-4 max-md:my-8 lg:my-8'}`}
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
