import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const MapSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
      <div className="w-full h-[100vw] min-h-[100vw] z-[9999] flex items-center justify-center">
        <div className="h-[42svh] max-md:hidden md:-mt-64">
          <Skeleton circle width={280} height={280} />
        </div>
        <div className="h-[42svh] md:hidden">
          <Skeleton circle width={208} height={208} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default MapSkeleton
