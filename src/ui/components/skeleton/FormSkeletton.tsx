import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonForm = () => {
  return (
    <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
      <form>
        <h2 className="h2">
          <Skeleton width={200} />
        </h2>

        <label>
          <Skeleton width={100} />
          <Skeleton width={200} height={20} />
        </label>
        <Skeleton height={40} />

        <label>
          <Skeleton width={100} />
          <Skeleton width={200} height={20} />
        </label>
        <Skeleton height={40} />

        <label>
          <Skeleton width={150} />
          <Skeleton width={200} height={20} />
        </label>
        <Skeleton height={40} />

        <button className="btn-xl btn-submit" type="submit">
          <Skeleton width={100} />
        </button>
      </form>
    </SkeletonTheme>
  )
}

export default SkeletonForm
