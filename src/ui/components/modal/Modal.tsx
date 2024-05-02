import { useState, createContext } from 'react'
import { createPortal } from 'react-dom'
import useModal from './useModal'
import type {
  TBaseProps,
  TCloseButtonProps,
  TModalContext,
  TOpenButtonProps,
  TOverlayProps,
  TWindow
} from './modal.types'

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

function OpenButton({
  className = '',
  windowNameToOpen,
  children
}: TOpenButtonProps) {
  const { openWindowWithName } = useModal()

  return (
    <button
      className={className}
      onClick={() => openWindowWithName(windowNameToOpen)}
    >
      {children}
    </button>
  )
}

function Window({ windowNameToOpen, children }: TWindow) {
  const { windowName, closeWindow } = useModal()
  const modalRoot = document.getElementById('root-portal-modal')

  if (windowNameToOpen !== windowName || !modalRoot) return null

  return createPortal(
    <Overlay
      onClick={(e) => {
        const targetElement = e.target as Element
        const isClickedModalWindow = targetElement.closest('#modal-window')
        if (!isClickedModalWindow) closeWindow()
      }}
    >
      <div id="modal-window">
        <CloseButton onClick={closeWindow}>close</CloseButton>
        <div>{children}</div>
      </div>
    </Overlay>,
    modalRoot
  )
}

function Overlay({ onClick, children }: TOverlayProps) {
  return (
    <div
      onClick={onClick}
      className="fixed top-0 left-0 w-full h-screen bg-[var(--backdrop-color)] backdrop-blur-[4px] z-50 transition-all duration-200"
    >
      {children}
    </div>
  )
}

function CloseButton({ className = '', onClick, children }: TCloseButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
