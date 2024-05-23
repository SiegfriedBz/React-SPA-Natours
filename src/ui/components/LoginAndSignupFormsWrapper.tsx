import { useLayoutEffect, useState } from 'react'
import ModalProvider from './modal/Modal'
import ForgotMyPasswordForm from '../../feature/user/components/forms/ForgotMyPasswordForm'
import { cldBaseUrl } from './cloudinary/utils'

type TProps = {
  children: React.ReactNode
}
const images = [
  {
    id: 1,
    url: `${cldBaseUrl}/v1716467110/natours/hero-01.jpg`
  },
  {
    id: 2,
    url: `${cldBaseUrl}/v1716473533/natours/hero-02.jpg`
  },
  {
    id: 3,
    url: `${cldBaseUrl}/v1716473597/natours/hero-03.jpg`
  }
]
const LoginAndSignupFormsWrapper = ({ children }: TProps) => {
  const [imgNum, setImgNum] = useState(() => {
    return Math.floor(Math.random() * 3) + 1
  })

  useLayoutEffect(() => {
    const randomImgNum = Math.floor(Math.random() * 3) + 1
    setImgNum(randomImgNum)
  }, [])

  const imgUrl = images.find((img) => img.id === imgNum)?.url

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
        {children}
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
              max-sm:my-4 sm:mt-4
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

export default LoginAndSignupFormsWrapper
