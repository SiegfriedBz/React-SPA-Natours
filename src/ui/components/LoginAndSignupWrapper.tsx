import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router'
import LoginForm from '../../feature/auth/components/LoginForm'
import ModalProvider from './modal/Modal'
import ForgotMyPasswordForm from '../../feature/user/components/forms/ForgotMyPasswordForm'
import SignupForm from '../../feature/user/components/forms/SignupForm'

const API_PUBLIC_URL = import.meta.env.VITE_API_PUBLIC_URL

const LoginAndSignupWrapper = () => {
  const { pathname, state } = useLocation()
  const prevPathname = state?.prevPathname
  const [imageTourNumber, setImageTourNumber] = useState(() => {
    return Math.floor(Math.random() * 6) + 1
  })

  useLayoutEffect(() => {
    const randomTourNumber = Math.floor(Math.random() * 6) + 1
    setImageTourNumber(randomTourNumber)
  }, [])

  const imgUrl = `${API_PUBLIC_URL}/img/tours/tour-${imageTourNumber}-cover.jpg`

  const isLogin = pathname === '/login'

  return (
    <div className="max-sm:px-2 w-full">
      <div
        className="container max-w-6xl w-full
          mx-auto
          flex justify-center
          rounded-lg
          shadow-xl
          hover:shadow-2xl
          overflow-hidden
          mt-8
        "
      >
        <div
          className="flex-1 min-w-[24%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${imgUrl})`
          }}
        ></div>

        {isLogin ? <LoginForm prevPathname={prevPathname} /> : <SignupForm />}
      </div>
      <div
        className="container max-w-6xl
          mx-auto w-full
        "
      >
        <ModalProvider>
          <ModalProvider.OpenButton
            windowNameToOpen="forgot-password-form"
            className="
              mt-4
              btn btn-primary
            "
          >
            Reset my password
          </ModalProvider.OpenButton>
          <ModalProvider.Window windowNameToOpen="forgot-password-form">
            <ForgotMyPasswordForm />
          </ModalProvider.Window>
        </ModalProvider>
      </div>
    </div>
  )
}

export default LoginAndSignupWrapper
