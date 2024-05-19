import { SVGStarIcon } from './SVGIcon'

type TRatingStarsProps = {
  variant?: 'sm' | undefined
  rating: number
}

const RatingStars = ({ variant, rating }: TRatingStarsProps) => {
  const numOfStars = Math.round(rating)

  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((starNum) => {
        const className = `${starNum <= numOfStars ? 'fill-primary-dark' : 'fill-stone-300'}`

        return (
          <SVGStarIcon key={starNum} variant={variant} className={className} />
        )
      })}
    </div>
  )
}

export default RatingStars
