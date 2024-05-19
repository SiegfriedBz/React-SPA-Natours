import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import useModal from './hooks/useModal'
import AnimatedWindow from './AnimatedWindow'
import Overlay from './Overlay'
import CloseButton from './CloseButton'
import type { TWindow } from './modal.types'

const Window = ({
  isFullHeight = false,
  windowNameToOpen,
  children,
  closeBtnIsVisible = true
}: TWindow) => {
  const { windowName, closeWindow } = useModal()
  const modalRoot = document.getElementById('root-portal-modal')

  const isVisible = windowNameToOpen === windowName

  if (!modalRoot) return null

  return createPortal(
    <AnimatePresence key="modal-overlay">
      {isVisible && (
        <Overlay
          onClick={(e) => {
            const targetElement = e.target as Element
            const isClickedModalWindow = targetElement.closest('#modal-window')
            if (!isClickedModalWindow) closeWindow()
          }}
        >
          <AnimatedWindow isFullHeight={isFullHeight}>
            <CloseButton
              isFullHeight={isFullHeight}
              onClick={closeWindow}
              className={`text-stone-700 ${closeBtnIsVisible ? '' : 'hidden'}`}
            >
              <CrossCircledIcon width="24" height="24" />
            </CloseButton>

            {children}
          </AnimatedWindow>
        </Overlay>
      )}
    </AnimatePresence>,
    modalRoot
  )
}

export default Window
