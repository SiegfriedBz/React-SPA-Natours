import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  forgotMyPasswordZodSchema,
  type TForgotMyPasswordInput
} from '../../zod/user.zodSchema'
import { useForgotMyPassword } from '../../hooks/useForgotMyPassword'
import FormInputError from '../../../../ui/components/FormInputError'
import Loading from '../../../../ui/components/loading/Loading'

const ForgotMyPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TForgotMyPasswordInput>({
    resolver: zodResolver(forgotMyPasswordZodSchema)
  })

  const { mutate, isPending } = useForgotMyPassword()

  const onSubmit: SubmitHandler<TForgotMyPasswordInput> = (data) => {
    mutate(data)
  }

  return (
    <form className="m-0" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h2">Reset my password - 1/2</h2>

      {isPending ? (
        <Loading />
      ) : (
        <>
          <label>Email</label>
          <input {...register('email')} />
          <FormInputError errorField={errors.email} />

          <button className="btn-primary btn-submit" type="submit">
            Submit email
          </button>
        </>
      )}
    </form>
  )
}

export default ForgotMyPasswordForm
