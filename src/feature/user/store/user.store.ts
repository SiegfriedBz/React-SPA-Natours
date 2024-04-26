import { create } from 'zustand'
import { TUser } from '../../../types/user.types'

type Store = {
  user: TUser | null
  setUser: (userData: TUser | null) => void
}

export const useUserStore = create<Store>()((set) => ({
  user: null,
  setUser: (userData) => set(() => ({ user: userData }))
}))
