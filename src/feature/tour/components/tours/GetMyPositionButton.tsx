type TProps = {
  disabled: boolean
  onClick: () => void
}

const GetMyPositionButton = (props: TProps) => {
  return (
    <button
      className="btn-xl btn-secondary whitespace-nowrap"
      type="button"
      {...props}
    >
      Get my position
    </button>
  )
}

export default GetMyPositionButton
