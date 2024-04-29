import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../ui/layout/AppLayout'
import Login from '../feature/auth/pages/login'
import Signup from '../feature/user/pages/signup'
import ForgotMyPassword from '../feature/user/pages/forgotMyPassword'
import ResetMyPassword from '../feature/user/pages/resetMyPassword'
import Tours from '../feature/tour/pages/tours'
import Tour from '../feature/tour/pages/tour'
import CreateTourForm from '../feature/tour/components/CreateTourForm'
import UpdateTourForm from '../feature/tour/components/UpdateTourForm'
import Stats from '../feature/tour/pages/stats'
import MonthlyStats from '../feature/tour/pages/monthlyStats'
import About from '../ui/pages/about'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Tours /> },
      { path: '/tours', element: <Navigate to="/" replace={true} /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/resetMyPassword-1/2', element: <ForgotMyPassword /> },
      {
        path: '/resetMyPassword-2/2/:resetPasswordToken',
        element: <ResetMyPassword />
      },
      { path: '/about', element: <About /> },
      { path: '/tours/new', element: <CreateTourForm /> },
      { path: '/tours/:tourId', element: <Tour /> },
      { path: '/tours/:tourId/update', element: <UpdateTourForm /> },
      { path: '/tours/stats', element: <Stats /> },
      { path: '/tours/stats/:year', element: <MonthlyStats /> }
    ]
  }
])

export default router
