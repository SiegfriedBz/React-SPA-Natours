import { useParams } from 'react-router'
import ResetMyPasswordForm from '../components/forms/ResetMyPasswordForm'

const ResetMyPassword = () => {
  const { resetPasswordToken } = useParams()

  return <ResetMyPasswordForm resetPasswordToken={resetPasswordToken} />
}

export default ResetMyPassword
