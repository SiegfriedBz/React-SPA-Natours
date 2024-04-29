import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateMe } from '../hooks/useUpdateMe'
import { updateMeZodSchema, type TUpdateMeInput } from '../zod/user.zodSchema'
import { TUser } from '../../../types/user.types'

const API_PUBLIC_URL = import.meta.env.VITE_API_PUBLIC_URL

type TProps = {
  user: TUser
}
const UpdateMeForm = ({ user }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // setError
  } = useForm<TUpdateMeInput>({
    resolver: zodResolver(updateMeZodSchema)
  })

  const { mutate } = useUpdateMe()

  const onSubmit: SubmitHandler<TUpdateMeInput> = (data) => {
    mutate(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} defaultValue={user?.name || ''} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input {...register('email')} defaultValue={user?.email || ''} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Photo</label>
        <img
          src={
            user?.photo
              ? `${API_PUBLIC_URL}/img/users/${user.photo}`
              : '/img/user/default.jpg'
          }
          alt="user profile"
          width={250}
        />
        <input type="file" {...register('photo')} />
        {errors.photo && <span>{errors.photo.message as string}</span>}
      </div>

      <button type="submit">Update me</button>
    </form>
  )
}

export default UpdateMeForm
