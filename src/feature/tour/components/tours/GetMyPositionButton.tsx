type TProps = {
  disabled: boolean
  onClick: () => void
}

const GetMyPositionButton = (props: TProps) => {
  return (
    <button
      className="btn max-sm:mt-2 max-sm:w-full btn-secondary whitespace-nowrap"
      type="button"
      {...props}
    >
      Get my position
    </button>
  )
}

export default GetMyPositionButton
