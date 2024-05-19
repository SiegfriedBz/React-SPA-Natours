import { Link } from 'react-router-dom'
import useUserStore from '../../../user/store/user.store'

import logoWhite from '../../../../assets/logo-white.png'
import StripeCheckoutButton from '../../../stripe/components/StripeCheckoutButton'
import RefetchButton from '../../../../ui/components/RefetchButton'
import type { TTour } from '../../../../types/tour.types'
import { useGetTour } from '../../hooks/useGetTour'

const API_PUBLIC_URL = import.meta.env.VITE_API_PUBLIC_URL

type TProps = {
  tourId: string
}

const TourCta = ({ tourId }: TProps) => {
  const user = useUserStore((state) => state.user)

  const { data, refetch, isError, isLoading } = useGetTour({ tourId })

  if (isError) {
    return <RefetchButton refetch={refetch} />
  }

  const tour: TTour | undefined = data?.data?.tour

  const images = tour?.images
  const duration = tour?.duration

  return (
    <section
      data-cy="tour-cta"
      className="
      flex
      relative 

      w-11/12
      xl:max-w-5xl
      mx-auto

      max-sm:-mt-8
      max-md:-mt-48
      md:-mt-64
      lg:-mt-32

      max-md:mb-[4.5rem]
      md:mb-32 
      lg:mb-44

      max-sm:px-4 
      max-md:px-16 
      md:pl-24
      md:pr-16
      lg:pl-44
      lg:pr-8

      max-md:py-8
      md:py-12
      lg:py-24

      rounded-2xl overflow-hidden 
      bg-stone-100
      border-2 border-stone-200
      shadow-xl 
      md:shadow-2xl 
    "
    >
      <img
        className="p-4 md:p-8
          flex
          items-center
          justify-center
          bg-gradient-to-tr from-primary-dark to-primary-light

          absolute
          left-0
          top-1/2
          -translate-y-1/2
          max-md:w-24 max-md:h-24
          md:w-40 md:h-40
          rounded-full
          object-contain
          shadow-2xl

          -translate-x-[35%]
          z-10
        "
        src={logoWhite}
        alt="Natours
        logo"
      />
      {images?.slice(0, 2).map((image, index) => {
        const imgClass =
          index === 0 ? 'translate-x-[12%] z-9' : '-translate-x-[8%] z-8'
        return isLoading ? (
          // TODO: Add skeleton loader
          <div>ljbljb</div>
        ) : (
          <img
            key={index}
            src={`${API_PUBLIC_URL}/img/tours/${image}`}
            alt={`Image-${index}`}
            className={`
                max-sm:hidden
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                max-md:w-24 max-md:h-24
                md:w-40 md:h-40
                rounded-full
                shadow-2xl 
                ${imgClass}
              `}
          />
        )
      })}

      <div
        className="flex 
          max-lg:flex-col 
          max-lg:justify-center 
          lg:justify-between 
          lg:space-x-16 
          md:space-y-6
          lg:space-y-0
          items-center 
          ml-16 
        "
      >
        <div className="max-md:mb-4 text-right">
          <h2 className="h2 md:whitespace-nowrap">What are you waiting for?</h2>
          <p className="mt-2 text-lg">
            {`${duration ?? 2} days. 1 adventure. Infinite memories.`}{' '}
            <span className="inline-block">Make it yours today!</span>
          </p>
        </div>

        {user != null ? (
          <StripeCheckoutButton
            tourId={tourId}
            className="btn-primary ms-auto btn md:btn-xl rounded-2xl whitespace-nowrap max-md:self-end md:self-center"
          />
        ) : (
          <Link
            to="/login"
            className="btn-primary ms-auto btn md:btn-xl rounded-2xl whitespace-nowrap max-md:self-end md:self-center"
          >
            Log in to book tour
          </Link>
        )}
      </div>
    </section>
  )
}

export default TourCta
