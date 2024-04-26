import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignup } from '../hooks/useSignup'
import { signupZodSchema, type TSignupInput } from '../zod/user.zodSchema'

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // setError
  } = useForm<TSignupInput>({
    resolver: zodResolver(signupZodSchema)
  })

  const { mutate } = useSignup()

  const onSubmit: SubmitHandler<TSignupInput> = (data) => {
    console.log(data)
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register('name')} data-cy='form-signup-input-name' />
      {errors.name && <span>{errors.name.message}</span>}

      <label>Email</label>
      <input {...register('email')} data-cy='form-signup-input-email' />
      {errors.email && <span>{errors.email.message}</span>}

      <label>Password</label>
      <input {...register('password')} data-cy='form-signup-input-password' />
      {errors.password && <span>{errors.password.message}</span>}

      <label>Password confirm</label>
      <input
        {...register('passwordConfirmation')}
        data-cy='form-signup-input-passwordConfirmation'
      />
      {errors.passwordConfirmation && (
        <span>{errors.passwordConfirmation.message}</span>
      )}

      <button type='submit' data-cy='form-signup-btn'>
        Signup
      </button>
    </form>
  )
}

export default SignupForm
