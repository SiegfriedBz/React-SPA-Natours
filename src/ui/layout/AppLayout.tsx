import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '../components/Header'
import Footer from '../components/Footer'
import 'react-toastify/dist/ReactToastify.css'

const AppLayout = () => {
  return (
    <div className="layout">
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
      <ToastContainer />
    </div>
  )
}

export default AppLayout
