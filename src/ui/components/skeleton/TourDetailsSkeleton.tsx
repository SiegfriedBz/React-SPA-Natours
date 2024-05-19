import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const TourDetailsSkeleton = () => {
  return (
    <div data-cy="tour-details-wrapper">
      {/* hero */}
      <SkeletonTheme baseColor="#55c57a" highlightColor="#43a263">
        <section className="h-[38vw] relative u-clip-path-img">
          <div className="h-full">
            <div
              className=" 
              w-full h-full 
              bg-gradient-to-tr 
              from-primary-dark to-primary-light 
              opacity-85
              flex justify-center items-center
            "
            >
              <div className="z-[9999] -mt-32 flex flex-col items-center space-y-8">
                <Skeleton width={600} height={80} />
                <div className="flex items-center space-x-4">
                  <Skeleton width={200} height={30} />
                  <Skeleton width={200} height={30} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </SkeletonTheme>

      {/* middle */}
      <section className="-my-16 grid grid-cols-2 items-center gap-x-8 min-h-[90vh]">
        {/* left */}
        <div className="grid grid-rows-2 gap-y-2 h-[110%] w-full justify-center bg-stone-200">
          <div className="flex flex-col space-y-4 items-start justify-center">
            <h2 className="h2">Quick facts</h2>
            {/* Skeleton for OverviewBox */}
            <div className="flex items-center space-x-4">
              <Skeleton width={30} height={30} />
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
            {/* End of Skeleton */}
            {/* Skeleton for OverviewBox */}
            <div className="flex items-center space-x-4">
              <Skeleton width={30} height={30} />
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
            {/* End of Skeleton */}
            {/* Skeleton for OverviewBox */}
            <div className="flex items-center space-x-4">
              <Skeleton width={30} height={30} />
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
            {/* End of Skeleton */}
          </div>

          <div className="space-y-2">
            <h2 className="h2">Your tour guides</h2>
            {/* Skeleton for OverviewBox */}
            <div className="flex items-center space-x-4">
              <Skeleton width={30} height={30} />
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
            {/* End of Skeleton */}
            {/* Skeleton for OverviewBox */}
            <div className="flex items-center space-x-4">
              <Skeleton width={30} height={30} />
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
            {/* End of Skeleton */}
            {/* Skeleton for OverviewBox */}
            <div className="flex items-center space-x-4">
              <Skeleton width={30} height={30} />
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
            {/* End of Skeleton */}
          </div>
        </div>

        {/* right */}
        <div className="-mt-16 w-5/6 pl-16">
          <h2 className="h2">About Tour</h2>
          {/* Skeleton for Description */}
          <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
            <Skeleton count={4} />
          </SkeletonTheme>
          {/* End of Skeleton */}
        </div>
      </section>
    </div>
  )
}

export default TourDetailsSkeleton
