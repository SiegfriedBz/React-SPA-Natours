import CloudinaryImg from '../../../../ui/components/cloudinary/CloudinaryImg'
import RatingStars from '../../../../ui/components/RatingStars'
import userDefaultImage from '../../../../assets/user/default.jpg'
import type { TReview } from '../../../../types/review.types'

type TProps = {
  review: TReview
}
const TourReviewCard = ({ review }: TProps) => {
  const {
    user: { photo, name },
    content,
    rating
  } = review

  return (
    <div
      className="grid grid-rows-3
        max-sm:mt-16 
        max-md:mt-20 
        max-lg:mt-[12vw] 
        max-xl:mt-[24vw] 
        max-2xl:mt-[11vw] 
        2xl:mt-[12vw] 
        mb-4
        min-w-72 
        max-md:max-h-64
        md:max-h-72
        bg-stone-100
        shadow-md shadow-stone-200
        rounded-lg
        overflow-hidden
        opacity-90
      "
    >
      <div
        className="w-72 
          h-fit flex items-center justify-between space-x-4
          max-md:px-4 max-md:py-2
          md:px-8 md:py-4
        "
      >
        {photo ? (
          <CloudinaryImg
            url={photo}
            className="rounded-full
              mt-1
              sm:mt-2
              max-md:w-[4.5rem] max-md:h-[4.5rem] 
              md:w-20 md:h-20 
              object-cover
              ring-2 ring-stone-300
              shadow-md shadow-stone-300
            "
          />
        ) : (
          <img
            src={userDefaultImage}
            className="rounded-full
              mt-1
              sm:mt-2
              max-md:w-[4.5rem] max-md:h-[4.5rem] 
              md:w-20 md:h-20 
              object-cover
              ring-2 ring-stone-300
              shadow-md shadow-stone-300
            "
          />
        )}

        <h6 className="font-semibold">{name}</h6>
      </div>

      <p
        className="line-clamp-2 text-left text-base 
          max-sm:mt-2 
          sm:mt-4 
          -mb-6 
          px-8 
          pt-2 
          pb-4
          bg-stone-200 
        "
      >
        {content}
      </p>

      <div className="w-72 flex items-center justify-between">
        <div className="mx-auto space-x-1">
          <RatingStars variant="sm" rating={rating} />
        </div>
      </div>
    </div>
  )
}

export default TourReviewCard
