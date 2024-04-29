import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  resetMyPasswordZodSchema,
  type TResetMyPasswordInput
} from '../zod/user.zodSchema'
import { useResetMyPassword } from '../hooks/useResetMyPassword'

type TProps = {
  resetPasswordToken?: string
}

const ResetPasswordForm = ({ resetPasswordToken }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // setError
  } = useForm<TResetMyPasswordInput>({
    resolver: zodResolver(resetMyPasswordZodSchema)
  })

  const { mutate } = useResetMyPassword()

  const onSubmit: SubmitHandler<TResetMyPasswordInput> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('resetPasswordToken')}
        value={resetPasswordToken}
        type="hidden"
      />

      <label>Password</label>
      <input {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <label>Password</label>
      <input {...register('passwordConfirmation')} />
      {errors.passwordConfirmation && (
        <span>{errors.passwordConfirmation.message}</span>
      )}

      <button type="submit">Submit new password</button>
    </form>
  )
}

export default ResetPasswordForm
