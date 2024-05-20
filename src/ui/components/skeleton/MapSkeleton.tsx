import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const MapSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
      <div className="clip-path-map w-full my-64 h-[48rem] flex items-center justify-center  ">
        <div className="w-96 h-96 my-64 rounded-full overflow-hidden">
          <Skeleton circle={true} width={400} height={400} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default MapSkeleton
