type TProps = {
  variant?: 'sm' | 'xs' | undefined
}

const Loading = ({ variant }: TProps) => {
  const loaderClass =
    variant === 'sm'
      ? 'loader-sm'
      : variant === 'xs'
        ? 'loader-xs'
        : 'loader my-4'

  return (
    <div className="flex w-full items-center z-[99999]">
      <div className={`mx-auto ${loaderClass}`}></div>
    </div>
  )
}

export default Loading
