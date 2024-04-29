import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  forgotMyPasswordZodSchema,
  type TForgotMyPasswordInput
} from '../zod/user.zodSchema'
import { useForgotMyPassword } from '../hooks/useForgotMyPassword'

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // setError
  } = useForm<TForgotMyPasswordInput>({
    resolver: zodResolver(forgotMyPasswordZodSchema)
  })

  const { mutate } = useForgotMyPassword()

  const onSubmit: SubmitHandler<TForgotMyPasswordInput> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Submit email</button>
    </form>
  )
}

export default ForgotPasswordForm
