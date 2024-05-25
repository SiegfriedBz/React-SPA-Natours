import { Navigate } from 'react-router'
import { toast } from 'react-toastify'
import { useGetTour } from '../../hooks/useGetTour'
import SVGIcon from '../../../../ui/components/SVGIcon'
import RefetchButton from '../../../../ui/components/RefetchButton'
import RatingStars from '../../../../ui/components/RatingStars'
import TourDetailsSkeleton from '../../../../ui/components/skeleton/TourDetailsSkeleton'
import CloudinaryImg from '../../../../ui/components/cloudinary/CloudinaryImg'
import type { TBaseLocation, TTour } from '../../../../types/tour.types'
import type { TUser } from '../../../../types/user.types'

type TProps = {
  tourId?: string
}

const TourDetails = ({ tourId }: TProps) => {
  const { data, refetch, isError, isLoading } = useGetTour({
    tourId: tourId as string
  })

  if (isLoading) return <TourDetailsSkeleton />

  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  const tour: TTour | undefined = data?.data?.tour

  if (!tour) {
    toast.error('Tour not found')
    return <Navigate to="/" replace={true} />
  }

  const {
    name,
    imageCover,
    images,
    difficulty,
    duration,
    description,
    startLocation,
    startDates,
    maxGroupSize,
    ratingsAverage,
    guides
  } = tour

  return (
    <div data-cy="tour-details-wrapper">
      <HeroSection
        imageCover={imageCover}
        name={name}
        duration={duration}
        startLocation={startLocation}
      />

      <DescriptionSection
        startDates={startDates}
        difficulty={difficulty}
        maxGroupSize={maxGroupSize}
        ratingsAverage={ratingsAverage}
        guides={guides}
        description={description}
      />

      <PicturesBoxSection images={images} />
    </div>
  )
}

export default TourDetails

/** HeroSection */
type THeroSectionProps = {
  imageCover: string
  name: string
  duration: number
  startLocation: TBaseLocation
}
const HeroSection = ({
  imageCover,
  name,
  duration,
  startLocation
}: THeroSectionProps) => {
  return (
    <section
      data-cy="tour-hero"
      className="relative 
        max-md:h-[72svh]
        md:h-[calc(100svh-var(--header-h))]
        u-clip-path-img
      "
    >
      <div className="h-full">
        <div
          className="absolute 
            w-full h-full 
            u-bg-gradient-secondary
          "
        ></div>
        <CloudinaryImg
          url={imageCover}
          className="object-cover h-full w-full opacity-60"
        />
      </div>

      <div
        className="absolute 
          left-1/2 top-1/4 
          -translate-x-1/2 -translate-y-1/4
        "
      >
        <h1
          data-cy="tour-hero-title"
          className="h1 text-stone-100 opacity-90 font-light tracking-widest"
        >
          <span className="inline-block max-md:py-2 md:py-4 max-md:w-72 md:w-96 max-md:leading-[2.75rem] md:leading-[3.25rem]">{`${name} tour`}</span>
        </h1>

        <div
          className="flex justify-center align-items 
          text-stone-100 
            space-x-8 
            mt-8
            max-sm:text-lg 
            max-lg:text-xl 
            lg:text-2xl
            max-sm:font-bold 
            md:font-light
            uppercase
            opacity-85
          "
        >
          <div className="flex items-center space-x-2 shadow-sm">
            <SVGIcon iconName="clock" color="#f5f5f4" />
            <span className="whitespace-nowrap">{`${duration} days`}</span>
          </div>
          <div className="flex items-center space-x-2 shadow-sm">
            <SVGIcon iconName="map-pin" color="#f5f5f4" />
            <span className="whitespace-nowrap">
              {startLocation.description}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/** DescriptionSection */
type TDescriptionSectionProps = {
  startDates: Date[]
  difficulty: string
  maxGroupSize: number
  ratingsAverage: number
  guides: string[] | TUser[]
  description: string
}
const DescriptionSection = ({
  startDates,
  difficulty,
  maxGroupSize,
  ratingsAverage,
  guides,
  description
}: TDescriptionSectionProps) => {
  return (
    <section
      data-cy="tour-description"
      className="
        grid 
        items-center 
        max-md:min-h-[90vh]
        max-lg:min-h-[95vh]
        max-xl:min-h-[80vh]
        xl:h-[80vh]
        xl:max-h-[80vh]
        max-md:grid-cols-1 
        md:grid-cols-2 
        max-sm:-mt-16 
        max-md:-mt-24
        md:-mt-8
        md:gap-x-8 
      "
    >
      {/* left */}
      <div
        className="grid justify-center items-center
        max-md:pt-16
        md:py-8
        h-[110%] 
        w-full 
        grid-rows-2 
        lg:gap-y-2 
        bg-stone-200 
        "
      >
        <div
          className="flex 
          flex-col 
          space-y-4 
          items-start 
          justify-center
          max-md:mt-12
          "
        >
          <h2 className="h2">Quick facts</h2>
          <OverviewBox
            iconName="calendar"
            label="Next date"
            content={
              startDates && startDates.length > 0
                ? new Date(startDates[0]).toLocaleString('en-us', {
                    month: 'long',
                    year: 'numeric'
                  })
                : ''
            }
          />
          <OverviewBox
            iconName="trending-up"
            label="Difficulty"
            content={difficulty}
          />
          <OverviewBox
            iconName="user"
            label="Participants"
            content={`${maxGroupSize} people`}
          />
          <OverviewBox
            iconName="star"
            label="Rating"
            content={<RatingStars variant="sm" rating={ratingsAverage} />}
          />
        </div>

        <div className="space-y-2 max-lg:mb-12 md:-mt-24 xl:-mt-16">
          <h2 className="h2">Your tour guides</h2>
          {guides?.map((guide) => {
            const { _id, photo, role, name } = guide as TUser
            return (
              <div key={_id}>
                <OverviewBox
                  userPhoto={photo}
                  userRole={role}
                  label={role === 'guide' ? 'Tour Guide' : role}
                  content={name}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* right */}
      <div
        className="
          mx-auto 
          max-md:w-5/6 
          max-lg:w-full 
          lg:w-11/12
          max-md:mt-12
          max-md:mb-32
          max-lg:-mt-40
          lg:-mt-24
        "
      >
        <h2 className="h2">{`About ${name} tour`}</h2>
        {description?.split('\n').map((p, i) => {
          return (
            <p
              key={i}
              className="
                w-full  
                max-lg:my-4 
                max-xl:my-8
                xl:my-12 
                opacity-90
              "
            >
              {p}
            </p>
          )
        })}
      </div>
    </section>
  )
}

type TOverviewBoxProps = {
  iconName?: string
  userPhoto?: string
  userRole?: string
  label: string
  content: React.ReactNode
}
const OverviewBox = ({
  iconName = '',
  userPhoto = '',
  userRole = '',
  label,
  content
}: TOverviewBoxProps) => {
  return (
    <div className="flex items-center space-x-4">
      {iconName && <SVGIcon iconName={iconName} />}
      {userPhoto && userRole && (
        <CloudinaryImg
          url={userPhoto}
          className="w-8 h-8 md:w-16 md:h-16 rounded-full object-cover"
        />
      )}

      <span className="capitalize font-semibold">{label}</span>
      <span className="">{content}</span>
    </div>
  )
}

/** PicturesBoxSection */
type TPicturesBoxSectionProps = { images: string[] }
const PicturesBoxSection = ({ images }: TPicturesBoxSectionProps) => {
  return (
    <section
      data-cy="tour-images"
      className="max-2xl:-mt-32
      2xl:-mt-48
      flex 
        [clip-path:polygon(0_12vw,_100vw_0vw,_100vw_16vw,_0vw_28vw)]
      "
    >
      {images?.map((img, i) => {
        const idx = i + 1
        const imgClass = `h-full object-cover opacity-90
        ${idx === 1 ? 'pt-[8vw]' : idx === 2 ? 'pt-[2vw]' : 'pt-[0]'}`
        return (
          <div key={i} className="w-full min-h-[24vw]">
            <CloudinaryImg url={img} className={imgClass} />
          </div>
        )
      })}
    </section>
  )
}
