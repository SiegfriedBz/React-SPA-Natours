import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const TourReviewsSkeleton = () => {
  return (
    <section
      className="relative
        max-sm:-mt-[38vw]
        max-md:-mt-[42vw]
        max-lg:-mt-[46vw]
        max-xl:-mt-[48vw]
        xl:-mt-[52vw]
        max-md:reviewsBgSmall
        md:reviewsBgBig
        h-[124vw]
        max-h-[64rem]

        max-sm:[clip-path:_polygon(0_22vw,_100vw_10vw,_100vw_98vw,_0vw_110vw)]
        max-md:[clip-path:_polygon(0_22vw,_100vw_10vw,_100vw_76vw,_0vw_88vw)]
        max-lg:[clip-path:_polygon(0_26vw,_100vw_14vw,_100vw_68vw,_0vw_80vw)]
        max-xl:[clip-path:_polygon(0_28vw,_100vw_16vw,_100vw_64vw,_0vw_76vw)]
        xl:[clip-path:_polygon(0_18vw,_100vw_6vw,_100vw_46vw,_0vw_58vw)]
        2xl:[clip-path:_polygon(0_18vw,_100vw_6vw,_100vw_38vw,_0vw_50vw)]

        w-full
    "
    >
      <div
        className="absolute
          top-1/4 -translate-y-1/4
          left-1/2 -translate-x-1/2
          flex w-[75vw] 
          mx-auto 
          space-x-24 
          overflow-x-auto u-no-scrollbar
        "
      >
        {/* Skeleton for TourReviewCard */}
        <SkeletonTheme baseColor="#55c57a" highlightColor="#43a263">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
            <TourReviewCardSkeleton key={key} />
          ))}
        </SkeletonTheme>
        {/* End of Skeleton */}
      </div>
    </section>
  )
}

export default TourReviewsSkeleton

const TourReviewCardSkeleton = () => {
  return (
    <div
      className="max-sm:mt-16 max-md:mt-20 max-lg:mt-[12vw] max-xl:mt-[24vw] max-2xl:mt-[11vw] 2xl:mt-[12vw] 
        mb-4
        grid grid-rows-3 
        max-md:max-h-64
        min-w-72 md:max-h-72
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
        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
          <Skeleton circle={true} width={40} height={40} />
        </SkeletonTheme>

        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
          <Skeleton width={100} />
        </SkeletonTheme>
      </div>

      <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
        <Skeleton height={100} />
      </SkeletonTheme>

      <div className="w-72 flex items-center justify-between">
        <div className="mx-auto  space-x-1">
          <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
            <Skeleton count={5} />
          </SkeletonTheme>
        </div>
      </div>
    </div>
  )
}
