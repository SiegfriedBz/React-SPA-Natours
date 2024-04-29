import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateMyPassword } from '../hooks/useUpdateMyPassword'
import {
  updateMyPasswordZodSchema,
  type TUpdateMyPasswordInput
} from '../zod/user.zodSchema'

const UpdateMyPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // setError
  } = useForm<TUpdateMyPasswordInput>({
    resolver: zodResolver(updateMyPasswordZodSchema)
  })

  const { mutate } = useUpdateMyPassword()

  const onSubmit: SubmitHandler<TUpdateMyPasswordInput> = (data) => {
    mutate(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Current Password</label>
        <input {...register('currentPassword')} />
        {errors.currentPassword && (
          <span>{errors.currentPassword.message}</span>
        )}
      </div>

      <div>
        <label>New password</label>
        <input {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label>New password confirmation</label>
        <input {...register('passwordConfirmation')} />
        {errors.passwordConfirmation && (
          <span>{errors.passwordConfirmation.message}</span>
        )}
      </div>

      <button type="submit">Update my password</button>
    </form>
  )
}

export default UpdateMyPasswordForm
