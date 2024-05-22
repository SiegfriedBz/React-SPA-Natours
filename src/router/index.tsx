/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AppLayout from '../ui/layout/AppLayout'
import ProtectRoute from './ProtectRoute'
import RestrictTo from './RestrictTo'
import RootBoundary from '../ui/components/RootBoundary'
import Tours from '../feature/tour/pages/tours'
import TourDetailsSkeleton from '../ui/components/skeleton/TourDetailsSkeleton'
import Loading from '../ui/components/loading/Loading'
const LazyTour = lazy(() => import('../feature/tour/pages/tour'))
const LazySignup = lazy(() => import('../feature/user/pages/signup'))
const LazyLogin = lazy(() => import('../feature/auth/pages/login'))
const LazyResetMyPassword = lazy(
  () => import('../feature/user/pages/resetMyPassword')
)
const LazyToursInsights = lazy(
  () => import('../feature/tour/pages/stats/toursInsights')
)
const LazyAbout = lazy(() => import('../ui/pages/about'))
const LazyMyBookings = lazy(() => import('../feature/booking/pages/myBookings'))
const LazyUserProfile = lazy(() => import('../feature/user/pages/userProfile'))
const LazyCreateTour = lazy(() => import('../feature/tour/pages/createTour'))
const LazyUpdateTour = lazy(() => import('../feature/tour/pages/updateTour'))
const LazyToursPlanning = lazy(
  () => import('../feature/tour/pages/stats/toursPlanning')
)

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RootBoundary />,
    children: [
      {
        path: '/',
        element: <Tours />
      },
      { path: '/tours', element: <Navigate to="/" replace={true} /> },
      {
        path: '/tours/:tourId',
        element: (
          <Suspense fallback={<TourDetailsSkeleton />}>
            <LazyTour />
          </Suspense>
        )
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loading />}>
            <LazyLogin />
          </Suspense>
        )
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<Loading />}>
            <LazySignup />
          </Suspense>
        )
      },
      {
        path: '/resetMyPassword-2/2/:resetPasswordToken',
        element: (
          <Suspense fallback={<Loading />}>
            <LazyResetMyPassword />
          </Suspense>
        )
      },
      {
        path: '/tours/insights',
        element: (
          <Suspense fallback={<Loading />}>
            <LazyToursInsights />
          </Suspense>
        )
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<Loading />}>
            <LazyAbout />
          </Suspense>
        )
      },
      {
        path: '/my-bookings',
        element: (
          <Suspense fallback={<Loading />}>
            <LazyMyBookings />
          </Suspense>
        )
      },
      {
        element: <ProtectRoute />,
        children: [
          {
            path: '/me',
            element: (
              <Suspense fallback={<Loading />}>
                <LazyUserProfile />
              </Suspense>
            )
          },
          {
            element: <RestrictTo authorizedRoles={['admin', 'lead-guide']} />,
            children: [
              {
                path: '/tours/new',
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyCreateTour />
                  </Suspense>
                )
              },
              {
                path: '/tours/:tourId/update',
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyUpdateTour />
                  </Suspense>
                )
              }
            ]
          },
          {
            element: (
              <RestrictTo authorizedRoles={['admin', 'lead-guide', 'guide']} />
            ),
            children: [
              {
                path: '/tours/planning/:year',
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyToursPlanning />
                  </Suspense>
                )
              }
            ]
          }
        ]
      },
      { path: '*', element: <Navigate to="/" replace={true} /> }
    ]
  }
])

export default router
