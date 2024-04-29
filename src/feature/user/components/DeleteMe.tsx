import useDeleteMe from '../hooks/useDeleteMe'

const DeleteMe = () => {
  const { mutate } = useDeleteMe()

  const handleDeleteMe = async () => {
    mutate()
  }

  return (
    <div>
      DeleteMe
      <button type="button" onClick={handleDeleteMe}>
        Delete me
      </button>
    </div>
  )
}

export default DeleteMe
