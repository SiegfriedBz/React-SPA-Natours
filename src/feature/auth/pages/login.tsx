import { useLocation } from 'react-router'
import LoginForm from '../components/LoginForm'

const Login = () => {
  const { state } = useLocation()
  const prevPathname = state?.prevPathname

  return (
    <div>
      Login
      <LoginForm prevPathname={prevPathname} />
    </div>
  )
}

export default Login
