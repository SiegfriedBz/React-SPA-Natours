type TProps = {
  refetch: () => void
}

const RefetchButton = ({ refetch }: TProps) => {
  return (
    <div className="mt-16 flex flex-col mx-auto justify-center items-center w-full">
      <h2 className="h2">Error fetching data</h2>
      <button
        className="btn btn-primary mt-2"
        type="button"
        onClick={() => refetch()}
      >
        Retry
      </button>
    </div>
  )
}

export default RefetchButton
