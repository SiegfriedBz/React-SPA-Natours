import { useState, createContext } from 'react'
import OpenButton from './OpenButton'
import Window from './Window'
import type { TBaseProps, TModalContext } from './modal.types'

export const ModalContext = createContext<TModalContext | null>(null)

const ModalProvider = ({ children }: TBaseProps) => {
  const [windowName, setWindowName] = useState('')
  const closeWindow = () => setWindowName('')
  const openWindowWithName = setWindowName

  return (
    <ModalContext.Provider
      value={{ windowName, closeWindow, openWindowWithName }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider

ModalProvider.OpenButton = OpenButton
ModalProvider.Window = Window
