import ModalProvider from '../../../ui/components/modal/Modal'
import useDeleteMe from '../hooks/useDeleteMe'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

const DeleteMe = () => {
  const { mutate } = useDeleteMe()

  const handleDeleteMe = async () => {
    mutate()
  }

  return (
    <ModalProvider>
      <ModalProvider.OpenButton
        windowNameToOpen="delete-me-confirm"
        className="btn-warning btn-submit"
      >
        Delete me
      </ModalProvider.OpenButton>
      <ModalProvider.Window windowNameToOpen="delete-me-confirm">
        <form className="m-0">
          <h2 className="h2">Delete my account</h2>
          <div className="flex space-x-4 items-center">
            <div className="text-amber-600 mt-1">
              <ExclamationTriangleIcon width="48" height="48" />
            </div>
            <p>
              This action is irreversible. All your data will be lost. Are you
              sure you want to delete your account?
            </p>
          </div>
          <button
            className="btn-warning btn-submit"
            type="button"
            onClick={handleDeleteMe}
          >
            Delete me
          </button>
        </form>
      </ModalProvider.Window>
    </ModalProvider>
  )
}

export default DeleteMe
