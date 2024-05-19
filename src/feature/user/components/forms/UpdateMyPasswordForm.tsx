import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateMyPassword } from '../../hooks/useUpdateMyPassword'
import {
  updateMyPasswordZodSchema,
  type TUpdateMyPasswordInput
} from '../../zod/user.zodSchema'
import IsLoadingInput from '../../../../ui/components/loading/IsLoadingInput'
import FormInputError from '../../../../ui/components/FormInputError'

const UpdateMyPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TUpdateMyPasswordInput>({
    resolver: zodResolver(updateMyPasswordZodSchema)
  })

  const { mutate, isPending } = useUpdateMyPassword()

  const onSubmit: SubmitHandler<TUpdateMyPasswordInput> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h2">Update my password</h2>

      <label>Current Password</label>
      <IsLoadingInput isLoading={isPending}>
        <input {...register('currentPassword')} />
      </IsLoadingInput>
      <FormInputError errorField={errors.currentPassword} />

      <label>New password</label>
      <IsLoadingInput isLoading={isPending}>
        <input {...register('password')} />
      </IsLoadingInput>
      <FormInputError errorField={errors.password} />

      <label>New password confirmation</label>
      <IsLoadingInput isLoading={isPending}>
        <input {...register('passwordConfirmation')} />
      </IsLoadingInput>
      <FormInputError errorField={errors.passwordConfirmation} />

      <button
        disabled={isPending}
        className={`btn-primary btn-xl btn-submit 
                  ${isPending ? 'cursor-not-allowed' : ''}
                `}
        type="submit"
      >
        Update my password
      </button>
    </form>
  )
}

export default UpdateMyPasswordForm
