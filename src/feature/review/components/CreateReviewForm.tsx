import { useState } from 'react'
import { SubmitHandler, useForm, UseFormSetValue } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useUserStore from '../../../feature/user/store/user.store'
import { useCreateReviewOnTour } from '../hooks/useCreateReviewOnTour'
import {
  createReviewZodSchema,
  type TCreateReviewInput
} from '../zod/review.zod'
import FormInputError from '../../../ui/components/FormInputError'
import IsLoadingInput from '../../../ui/components/loading/IsLoadingInput'
import RatingStars from '../../../ui/components/RatingStars'
import { SVGStarIcon } from '../../../ui/components/SVGIcon'

const API_PUBLIC_URL = import.meta.env.VITE_API_PUBLIC_URL

type TProps = {
  tourId: string
  tourName: string
  tourImageCover: string
  tourCurrentRatingsAverage: number
}
const CreateReviewForm = ({
  tourId,
  tourName,
  tourImageCover,
  tourCurrentRatingsAverage
}: TProps) => {
  const user = useUserStore((state) => state.user)
  const userId = user?._id

  // Current user rating input
  const [userRating, setUserRating] = useState(5)
  const [transientUserRating, setTransientUserRating] = useState<number | null>(
    userRating
  )

  // Create review on tour
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TCreateReviewInput>({
    resolver: zodResolver(createReviewZodSchema)
  })

  const { mutate, isPending } = useCreateReviewOnTour()

  const onSubmit: SubmitHandler<TCreateReviewInput> = (data) => {
    mutate(data)
  }

  return (
    <form className="m-0" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h2 mb-1">{tourName}</h2>

      <RatingStars rating={tourCurrentRatingsAverage} variant="sm" />

      <h3 className="h3 w-full mt-4 mb-2 italic text-left font-semibold">
        Leave a review
      </h3>

      <div className="relative">
        <div
          className="absolute 
              right-0 
              max-sm:w-28 max-sm:h-28  
              sm:w-32 sm:h-32  
              max-sm:-top-[6.5rem]
              sm:-top-32 
              rounded-full 
              ring-2 ring-stone-300 
              opacity-85
              shadow-md
              u-bg-gradient-primary
            "
        >
          <img
            className="rounded-full object-cover h-full w-full opacity-85"
            src={`${API_PUBLIC_URL}/img/tours/${tourImageCover}`}
            alt={`${tourName}`}
          />
        </div>
        {/* user & tour fields */}
        <input {...register('user')} defaultValue={userId} type="hidden" />
        <input {...register('tour')} defaultValue={tourId} type="hidden" />

        {/* content field */}
        <label>Content</label>
        <IsLoadingInput isLoading={isPending}>
          <input {...register('content')} />
        </IsLoadingInput>
        <FormInputError errorField={errors.content} />

        {/* rating field */}
        <label>Rating</label>
        <input {...register('rating')} type="hidden" />
        <UserRatingInput
          setValue={setValue}
          userRating={userRating}
          setUserRating={setUserRating}
          transientUserRating={transientUserRating}
          setTransientUserRating={setTransientUserRating}
        />

        <button
          disabled={isPending}
          className={`btn btn-primary btn-submit 
            ${isPending ? 'cursor-not-allowed' : ''}
          `}
          type="submit"
        >
          Create review
        </button>
      </div>
    </form>
  )
}

export default CreateReviewForm

type TUserRatingInputProps = {
  setValue: UseFormSetValue<{
    content: string
    rating: number
    user: string
    tour: string
  }>
  userRating: number
  setUserRating: React.Dispatch<React.SetStateAction<number>>
  transientUserRating: number | null
  setTransientUserRating: React.Dispatch<React.SetStateAction<number | null>>
}
const UserRatingInput = ({
  setValue,
  userRating,
  setUserRating,
  transientUserRating,
  setTransientUserRating
}: TUserRatingInputProps) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((starNum) => {
        const className = `h-8 w-8 mr-1 ${
          starNum <=
          (transientUserRating !== null ? transientUserRating : userRating)
            ? 'fill-primary-dark'
            : 'fill-stone-300'
        }`

        return (
          <SVGStarIcon
            key={`user-input-${starNum}`}
            onMouseEnter={() => setTransientUserRating(starNum)}
            onMouseLeave={() => setTransientUserRating(null)}
            onClick={() => {
              // update UI state
              setUserRating(starNum)
              // update form field value to be submitted
              setValue('rating', starNum)
            }}
            className={className}
          />
        )
      })}
    </div>
  )
}
