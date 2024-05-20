import { TOverlayProps } from './modal.types'

const Overlay = ({ onClick, children }: TOverlayProps) => {
  return (
    <div
      onClick={onClick}
      className="fixed 
        inset-0
        w-screen h-screen
        bg-stone-700 bg-opacity-70
        backdrop-blur-sm
        u-transition
      "
    >
      {children}
    </div>
  )
}

export default Overlay
