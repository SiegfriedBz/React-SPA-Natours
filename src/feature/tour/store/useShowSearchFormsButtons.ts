import { create } from 'zustand'

type TState = {
  searchFormsButtonsVisible: boolean
}
type TActions = {
  showSearchFormsButtons: () => void
  hideSearchFormsButtons: () => void
}
type TStore = TState & TActions

export const useShowSearchFormsButtons = create<TStore>()((set) => ({
  searchFormsButtonsVisible: false,
  showSearchFormsButtons: () => {
    set({ searchFormsButtonsVisible: true })
  },
  hideSearchFormsButtons: () => {
    set({ searchFormsButtonsVisible: false })
  }
}))
