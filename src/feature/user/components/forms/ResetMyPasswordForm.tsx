import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  resetMyPasswordZodSchema,
  type TResetMyPasswordInput
} from '../../zod/user.zodSchema'
import { useResetMyPassword } from '../../hooks/useResetMyPassword'
import Loading from '../../../../ui/components/loading/Loading'
import FormInputError from '../../../../ui/components/FormInputError'

type TProps = {
  resetPasswordToken?: string
}

const ResetMyPasswordForm = ({ resetPasswordToken }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TResetMyPasswordInput>({
    resolver: zodResolver(resetMyPasswordZodSchema)
  })

  // Set the value of 'resetPasswordToken'
  setValue('resetPasswordToken', resetPasswordToken as string)

  const { mutate, isPending } = useResetMyPassword()
  const onSubmit: SubmitHandler<TResetMyPasswordInput> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h2">Reset my password - 2/2</h2>

      {isPending ? (
        <Loading />
      ) : (
        <>
          <label>New password</label>
          <input {...register('password')} />
          <FormInputError errorField={errors.password} />

          <label>Confirm new password</label>
          <input {...register('passwordConfirmation')} />
          <FormInputError errorField={errors.passwordConfirmation} />

          <button className="btn-primary btn-submit" type="submit">
            Submit new password
          </button>
        </>
      )}
    </form>
  )
}

export default ResetMyPasswordForm
