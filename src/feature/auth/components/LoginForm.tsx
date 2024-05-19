import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginZodSchema, type TLoginInput } from '../zod/auth.zodSchema'
import { useLogin } from '../hooks/useAuth'
import LinkUnder from '../../../ui/components/LinkUnder'
import IsLoadingInput from '../../../ui/components/loading/IsLoadingInput'
import FormInputError from '../../../ui/components/FormInputError'

type TProps = {
  prevPathname?: string
}

const LoginForm = ({ prevPathname }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginInput>({
    resolver: zodResolver(loginZodSchema)
  })

  const { mutate, isPending } = useLogin({ prevPathname })

  const onSubmit: SubmitHandler<TLoginInput> = (data) => {
    mutate(data)
  }

  return (
    <form className="m-0 rounded-l-none" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h2">Log into your account</h2>

      <label>Email</label>
      <IsLoadingInput isLoading={isPending}>
        <input
          {...register('email')}
          data-cy="form-login-input-email"
          placeholder="admin@natours.com"
        />
      </IsLoadingInput>
      <FormInputError errorField={errors.email} />

      <label>Password</label>
      <IsLoadingInput isLoading={isPending}>
        <input
          {...register('password')}
          placeholder="123456"
          data-cy="form-login-input-password"
        />
      </IsLoadingInput>
      <FormInputError errorField={errors.password} />

      <button
        disabled={isPending}
        className={`btn-primary btn-submit 
            ${isPending ? 'cursor-not-allowed' : ''}
          `}
        type="submit"
        data-cy="form-login-btn"
      >
        Login
      </button>

      <h4 className="h4-gradient my-4">
        Or <LinkUnder to="/signup" label="Sign up" variant="dark" /> to create
        an account
      </h4>
    </form>
  )
}

export default LoginForm
