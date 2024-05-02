import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../ui/layout/AppLayout'
import Signup from '../feature/user/pages/signup'
import Login from '../feature/auth/pages/login'
import UserProfile from '../feature/user/pages/userProfile'
import ForgotMyPassword from '../feature/user/pages/forgotMyPassword'
import ResetMyPassword from '../feature/user/pages/resetMyPassword'
import Tours from '../feature/tour/pages/tours'
import Tour from '../feature/tour/pages/tour'
import CreateTour from '../feature/tour/pages/createTour'
import UpdateTour from '../feature/tour/pages/updateTour'
import Stats from '../feature/tour/pages/stats'
import MonthlyStats from '../feature/tour/pages/monthlyStats'
import About from '../ui/pages/about'
import MyBookings from '../feature/booking/pages/myBookings'
import ProtectRoute from './ProtectRoute'
import RestrictTo from './RestrictTo'

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
      { path: '/tours/:tourId', element: <Tour /> },
      { path: '/tours/stats', element: <Stats /> },
      { path: '/about', element: <About /> },
      {
        element: <ProtectRoute />,
        children: [
          { path: '/me', element: <UserProfile /> },
          { path: '/my-bookings', element: <MyBookings /> },
          {
            element: <RestrictTo authorizedRoles={['admin', 'lead-guide']} />,
            children: [
              { path: '/tours/new', element: <CreateTour /> },
              { path: '/tours/:tourId/update', element: <UpdateTour /> }
            ]
          },
          {
            element: (
              <RestrictTo authorizedRoles={['admin', 'lead-guide', 'guide']} />
            ),
            children: [
              { path: '/tours/stats/:year', element: <MonthlyStats /> }
            ]
          }
        ]
      }
    ]
  }
])

export default router
