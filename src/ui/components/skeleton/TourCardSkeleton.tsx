import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const TourCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
      <div
        className="rounded-lg 
        overflow-hidden 
        shadow-lg 
        bg-white 
        transition duration-300 
        hover:shadow-xl 
        hover:scale-[1.015]"
      >
        {/* card header skeleton */}
        <Skeleton height={200} />

        {/* card details skeleton */}
        <div className="p-4">
          <h4 className="text-sm uppercase font-bold my-2">
            <Skeleton width={100} />
          </h4>
          <p className="text-lg italic">
            <Skeleton count={2} />
          </p>

          <div className="mt-4">
            <div className="grid grid-cols-2 justify-items-start">
              <div className="h-8 flex items-center space-x-2">
                <Skeleton width={30} height={30} />
                <Skeleton width={100} />
              </div>
              <div className="h-8 flex items-center space-x-2">
                <Skeleton width={30} height={30} />
                <Skeleton width={100} />
              </div>
            </div>
            <div className="grid grid-cols-2 justify-items-start">
              <div className="h-8 flex items-center space-x-2">
                <Skeleton width={30} height={30} />
                <Skeleton width={100} />
              </div>
              <div className="h-8 flex items-center space-x-2">
                <Skeleton width={30} height={30} />
                <Skeleton width={100} />
              </div>
            </div>
          </div>
        </div>

        {/* card footer skeleton */}
        <div
          className="p-4
          bg-stone-100
          flex items-center justify-between
          "
        >
          <div className="flex flex-col gap-y-2 pl-1">
            <p>
              <Skeleton width={50} />
            </p>
            <p>
              <Skeleton width={50} />
              <span>
                <Skeleton width={20} />
              </span>
            </p>
          </div>

          <Skeleton width={80} height={40} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default TourCardSkeleton
