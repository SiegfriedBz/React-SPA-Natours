import { Link } from 'react-router-dom'
import ScrollDownButton from './ScrollDownButton'
import AnimatedSearchButtons from './AnimatedSearchButtons'
import { cldBaseUrl } from '../../../../ui/components/cloudinary/utils'
import type { TDistancesToTours } from '../../pages/tours'

type TProps = {
  handleScrollToTours: () => void
  setDistancesToTours: React.Dispatch<React.SetStateAction<TDistancesToTours>>
}
const HomeHero = ({ handleScrollToTours, setDistancesToTours }: TProps) => {
  return (
    <div
      className="homeHero relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${cldBaseUrl}/v1716473533/natours/hero-02.jpg)`
      }}
    >
      <div className="absolute inset-0 bg-stone-500 opacity-40"></div>
      <div
        className="relative 
          max-sm:max-w-sm
          max-lg:max-w-lg 
          lg:max-w-xl
          top-1/2 -translate-y-[42vh]
          left-1/2 -translate-x-1/2
          flex flex-col items-center justify-center 
          h-[52vh]
        "
      >
        <h1 className="h1 leading-[3rem] -skew-x-12">
          <span className="inline-block hero-span-light">Explore</span>
          <br className="sm:hidden" />
          <strong className="mx-2">the World</strong>
          <br />
          <span className="inline-block hero-span-light">with</span>
          <strong className="mx-2">Natours</strong>
        </h1>
        <p
          className="max-sm:mt-2 
            sm:mt-4
            opacity-90 
            text-center 
            max-sm:text-lg 
            sm:text-xl 
            font-semibold 
            text-stone-100 
            tracking-wider 
        "
        >
          Discover and book your next adventure
        </p>

        <div className="mt-8 flex justify-center space-x-8">
          <button
            onClick={handleScrollToTours}
            className="max-sm:w-36 sm:w-40 
              text-center  
              whitespace-nowrap 
              btn 
              btn-primary
            "
          >
            Explore Tours
          </button>
          <Link
            to="/about"
            className="max-sm:w-36 sm:w-40 
              text-center 
              whitespace-nowrap 
              btn-sm 
              font-extrabold
              text-xl
              btn-transparent-text-primary-ring-primary
            "
          >
            Learn More
          </Link>
        </div>

        {/* Animated search button <---> 3 buttons to open forms */}
        <div className="absolute w-full max-sm:px-2 -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex justify-center w-full">
            <AnimatedSearchButtons setDistancesToTours={setDistancesToTours} />
          </div>
        </div>
      </div>

      {/* arrow down */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
        <div className="animate-bounce text-stone-50">
          <ScrollDownButton handleScrollToTours={handleScrollToTours} />
        </div>
      </div>
    </div>
  )
}

export default HomeHero
