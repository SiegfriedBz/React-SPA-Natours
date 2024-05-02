import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateReviewOnTour } from '../hooks/useCreateReviewOnTour'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createReviewZodSchema,
  type TCreateReviewInput
} from '../zod/review.zod'
import { useParams } from 'react-router'
import { useUserStore } from '../../user/store/user.store'

const CreateReviewForm = () => {
  const { tourId } = useParams()
  const user = useUserStore((state) => state.user)
  const userId = user?._id

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError
    setValue
  } = useForm<TCreateReviewInput>({
    resolver: zodResolver(createReviewZodSchema)
  })

  // Set the values of 'user' and 'tour' fields
  setValue('user', userId as string)
  setValue('tour', tourId as string)

  const { mutate } = useCreateReviewOnTour()

  const onSubmit: SubmitHandler<TCreateReviewInput> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Content</label>
      <input {...register('content')} />
      {errors.content && <span>{errors.content.message}</span>}

      <label>rating</label>
      <input {...register('rating')} />
      {errors.rating && <span>{errors.rating.message}</span>}

      <button className="bg-blue-500 px-4 py-2" type="submit">
        Create review
      </button>
    </form>
  )
}

export default CreateReviewForm
