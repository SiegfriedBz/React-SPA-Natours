import { useParams } from 'react-router'
import ResetPasswordForm from '../components/ResetPasswordForm'

const ResetMyPassword = () => {
  const { resetPasswordToken } = useParams()

  return (
    <div>
      Reset my password - 2/2
      <ResetPasswordForm resetPasswordToken={resetPasswordToken} />
    </div>
  )
}

export default ResetMyPassword
