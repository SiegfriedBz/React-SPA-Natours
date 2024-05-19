import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const BookingCardSkeleton = () => {
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
            <Skeleton width={200} />
          </h4>

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

          <div className="flex flex-col items-center gap-y-1">
            <Skeleton width={80} height={40} />

            <Skeleton width={120} height={40} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default BookingCardSkeleton
