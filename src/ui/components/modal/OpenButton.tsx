import useModal from './hooks/useModal'
import type { TOpenButtonProps } from './modal.types'

const OpenButton = ({
  className = '',
  windowNameToOpen,
  children
}: TOpenButtonProps) => {
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

export default OpenButton
