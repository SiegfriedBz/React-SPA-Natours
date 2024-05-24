type TProps = {
  variant?: 'sm' | undefined
  className?: string
}

const Loading = ({ variant, className = '' }: TProps) => {
  const loaderClass = variant === 'sm' ? 'loader-sm' : 'loader my-4'

  return (
    <div className={`${className} flex w-full items-center z-[99999]`}>
      <div className={`mx-auto ${loaderClass}`}></div>
    </div>
  )
}

export default Loading

export const SuspenseLoading = () => {
  return <Loading className="h-[calc(100svh-var(--header-h))]" />
}
