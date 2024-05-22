import { useRouteError } from 'react-router'
import { isRouteErrorResponse } from 'react-router-dom'

const RootBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn&apos;t exist!</div>
    }

    if (error.status === 401) {
      return <div>You aren&apos;t authorized to see this</div>
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>
    }

    if (error.status === 418) {
      return <div>🫖</div>
    }
  }

  return <div>Something went wrong</div>
}

export default RootBoundary
