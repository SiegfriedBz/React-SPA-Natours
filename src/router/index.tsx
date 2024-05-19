import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../ui/layout/AppLayout'
import Signup from '../feature/user/pages/signup'
import Login from '../feature/auth/pages/login'
import UserProfile from '../feature/user/pages/userProfile'
import ResetMyPassword from '../feature/user/pages/resetMyPassword'
import Tours from '../feature/tour/pages/tours'
import Tour from '../feature/tour/pages/tour'
import CreateTour from '../feature/tour/pages/createTour'
import UpdateTour from '../feature/tour/pages/updateTour'
import ToursPlanning from '../feature/tour/pages/stats/toursPlanning'
import ToursInsights from '../feature/tour/pages/stats/toursInsights'
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
      { path: '/tours', element: <Navigate to="/?page=1" replace={true} /> },
      { path: '/tours/:tourId', element: <Tour /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/resetMyPassword-2/2/:resetPasswordToken',
        element: <ResetMyPassword />
      },
      { path: '/tours/insights', element: <ToursInsights /> },
      { path: '/about', element: <About /> },
      { path: '/my-bookings', element: <MyBookings /> },
      {
        element: <ProtectRoute />,
        children: [
          { path: '/me', element: <UserProfile /> },
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
              { path: '/tours/planning/:year', element: <ToursPlanning /> }
            ]
          }
        ]
      },
      // TODO - add a 404 page
      { path: '*', element: <Navigate to="/" replace={true} /> }
    ]
  }
])

export default router
