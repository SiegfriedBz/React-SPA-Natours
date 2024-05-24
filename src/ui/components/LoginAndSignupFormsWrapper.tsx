import ModalProvider from './modal/Modal'
import ForgotMyPasswordForm from '../../feature/user/components/forms/ForgotMyPasswordForm'

const images = [
  { id: 1, url: import.meta.env.VITE_LOGIN_BG_IMG_01_URL },
  { id: 2, url: import.meta.env.VITE_LOGIN_BG_IMG_02_URL },
  { id: 3, url: import.meta.env.VITE_LOGIN_BG_IMG_03_URL }
]

type TProps = {
  children: React.ReactNode
}
const LoginAndSignupFormsWrapper = ({ children }: TProps) => {
  const imgNum = Math.floor(Math.random() * 3) + 1
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
