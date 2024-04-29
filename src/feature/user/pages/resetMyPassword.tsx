import { useParams } from 'react-router'
import ResetMyPasswordForm from '../components/ResetMyPasswordForm'

const ResetMyPassword = () => {
  const { resetPasswordToken } = useParams()

  return (
    <div>
      Reset my password - 2/2
      <ResetMyPasswordForm resetPasswordToken={resetPasswordToken} />
    </div>
  )
}

export default ResetMyPassword
