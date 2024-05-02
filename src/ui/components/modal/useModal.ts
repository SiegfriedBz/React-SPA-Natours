import { useContext } from 'react'
import { ModalContext } from './Modal'

const useModal = () => {
  const contextValue = useContext(ModalContext)

  if (contextValue == null) {
    throw new Error('ModalContext must be used within its provider')
  } else {
    return contextValue
  }
}

export default useModal
