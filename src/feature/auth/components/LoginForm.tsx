import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginZodSchema, type TLoginInput } from '../zod/auth.zodSchema'
import { useLogin } from '../hooks/useAuth'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // setError
  } = useForm<TLoginInput>({
    resolver: zodResolver(loginZodSchema)
  })

  const { mutate } = useLogin()

  const onSubmit: SubmitHandler<TLoginInput> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register('email')} data-cy="form-login-input-email" />
      {errors.email && <span>{errors.email.message}</span>}

      <label>Password</label>
      <input {...register('password')} data-cy="form-login-input-password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" data-cy="form-login-btn">
        Login
      </button>
    </form>
  )
}

export default LoginForm
