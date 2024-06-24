import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

const CustomErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackError}
      onError={() => console.log('Error')}
      onReset={() => window.location.replace('/')}
    >
      {children}
    </ErrorBoundary>
  )
}

export default CustomErrorBoundary

const FallbackError = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props

  return (
    <div className="min-h-[70svh] flex flex-col gap-4 justify-center items-center">
      <h1 className="text-red-400 font-bold text-xl">Something went wrong </h1>
      <p className="font-semi-bold text-lg">{error.message}</p>
      <button className="btn btn-primary" onClick={resetErrorBoundary}>
        Back to home page
      </button>
    </div>
  )
}
