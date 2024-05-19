import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignup } from '../../hooks/useSignup'
import { signupZodSchema, type TSignupInput } from '../../zod/user.zodSchema'
import IsLoadingInput from '../../../../ui/components/loading/IsLoadingInput'
import FormInputError from '../../../../ui/components/FormInputError'

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSignupInput>({
    resolver: zodResolver(signupZodSchema)
  })

  const { isPending, mutate } = useSignup()

  const onSubmit: SubmitHandler<TSignupInput> = (data) => {
    mutate(data)
  }

  return (
    <form className="m-0 rounded-l-none" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h2">Sign up to create an account</h2>

      <label>Name</label>
      <IsLoadingInput isLoading={isPending}>
        <input {...register('name')} data-cy="form-signup-input-name" />
      </IsLoadingInput>
      <FormInputError errorField={errors.name} />

      <label>Email</label>
      <IsLoadingInput isLoading={isPending}>
        <input {...register('email')} data-cy="form-signup-input-email" />
      </IsLoadingInput>
      <FormInputError errorField={errors.email} />

      <label>Password</label>
      <IsLoadingInput isLoading={isPending}>
        <input {...register('password')} data-cy="form-signup-input-password" />
      </IsLoadingInput>
      <FormInputError errorField={errors.password} />

      <label>Password confirm</label>
      <IsLoadingInput isLoading={isPending}>
        <input
          {...register('passwordConfirmation')}
          data-cy="form-signup-input-passwordConfirmation"
        />
      </IsLoadingInput>
      <FormInputError errorField={errors.passwordConfirmation} />

      <button
        disabled={isPending}
        className={`btn-primary btn-submit 
            ${isPending ? 'cursor-not-allowed' : ''}
          `}
        type="submit"
        data-cy="form-signup-btn"
      >
        Signup
      </button>
    </form>
  )
}

export default SignupForm
