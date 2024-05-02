import { type ReactNode } from 'react'

export type TModalContext = {
  windowName: string
  closeWindow: () => void
  openWindowWithName: React.Dispatch<React.SetStateAction<string>>
}

export type TBaseProps = {
  className?: string
  children: ReactNode
}

export type TOpenButtonProps = {
  windowNameToOpen: TModalContext['windowName']
} & TBaseProps

export type TWindow = TOpenButtonProps

export type TOverlayProps = {
  onClick: (event: React.MouseEvent) => void
} & TBaseProps

export type TCloseButtonProps = {
  onClick: () => void
} & TBaseProps
