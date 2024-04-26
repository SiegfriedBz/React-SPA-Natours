import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../ui/layout/AppLayout'
import Tours from '../feature/tour/pages/tours'
import Login from '../feature/auth/pages/login'
import Signup from '../feature/user/pages/signup'
import About from '../ui/pages/about'
import CreateTourForm from '../feature/tour/components/CreateTourForm'
import UpdateTourForm from '../feature/tour/components/UpdateTourForm'
import Stats from '../feature/tour/pages/stats'
import MonthlyStats from '../feature/tour/pages/monthlyStats'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Tours /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/about', element: <About /> },
      { path: '/tours/new', element: <CreateTourForm /> },
      { path: '/tours/:id/update', element: <UpdateTourForm /> },
      { path: '/tours/stats', element: <Stats /> },
      { path: '/tours/stats/:year', element: <MonthlyStats /> }
    ]
  }
])

export default router
