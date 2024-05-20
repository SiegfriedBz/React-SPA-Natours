import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateMe } from '../../hooks/useUpdateMe'
import {
  updateMeZodSchema,
  type TUpdateMeInput
} from '../../zod/user.zodSchema'
import UserAvatar from '../UserAvatar'
import IsLoadingInput from '../../../../ui/components/loading/IsLoadingInput'
import FormInputError from '../../../../ui/components/FormInputError'
import type { TUser } from '../../../../types/user.types'

type TProps = {
  user: TUser
}
const UpdateMeForm = ({ user }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TUpdateMeInput>({
    resolver: zodResolver(updateMeZodSchema)
  })

  const { mutate, isPending } = useUpdateMe()

  const onSubmit: SubmitHandler<TUpdateMeInput> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h2">Update my profile</h2>

      <label>Name</label>
      <IsLoadingInput isLoading={isPending}>
        <input {...register('name')} defaultValue={user?.name || ''} />
      </IsLoadingInput>
      <FormInputError errorField={errors.name} />

      <label>Email</label>
      <IsLoadingInput isLoading={isPending}>
        <input {...register('email')} defaultValue={user?.email || ''} />
      </IsLoadingInput>
      <FormInputError errorField={errors.email} />

      <label>Photo</label>
      <UserAvatar className="md:w-24 md:h-24 mb-4 ring-4 ring-primary-light shadow-lg" />
      <IsLoadingInput isLoading={isPending}>
        <input type="file" {...register('photo')} className="file-input" />
      </IsLoadingInput>
      {errors.photo && (
        <FormInputError errorField={errors.photo as FieldError} />
      )}

      <button
        disabled={isPending}
        className={`btn-primary btn-xl btn-submit
            ${isPending ? 'cursor-not-allowed' : ''}
          `}
        type="submit"
      >
        Update me
      </button>
    </form>
  )
}

export default UpdateMeForm
