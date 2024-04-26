import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../ui/layout/AppLayout'
import Login from '../feature/auth/pages/login'
import Signup from '../feature/user/pages/signup'
import About from '../ui/pages/about'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <h1>Home</h1> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/about', element: <About /> }
    ]
  }
])

export default router
