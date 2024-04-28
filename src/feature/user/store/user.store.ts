import { create } from 'zustand'
import getPosition from '../../../utils/getPosition'
import type { TUser } from '../../../types/user.types'

type TState = {
  user: TUser | null
  userPosition?: {
    lat: string
    lng: string
  }
  getPositionStatus: 'idle' | 'loading' | 'error'
}
type TActions = {
  setUser: (userData: TUser | null) => void
  // set user position from user input
  setUserPosition: (latLng: string) => void
  // set user position from navigator
  getUserPosition: () => Promise<void>
}
type TStore = TState & TActions

export const useUserStore = create<TStore>()((set) => ({
  user: null,
  getPositionStatus: 'idle',
  setUser: (userData) => set(() => ({ user: userData })),
  setUserPosition: (latLng: string) => {
    const [lat, lng] = latLng.split(',')

    set({
      userPosition: { lat, lng }
    })
  },
  getUserPosition: async () => {
    try {
      set({
        getPositionStatus: 'loading'
      })
      // Get the user's geolocation position
      const position = await getPosition()
      const lat = position?.coords?.latitude?.toString()
      const lng = position?.coords?.longitude?.toString()

      set({
        userPosition: { lat, lng },
        getPositionStatus: 'idle'
      })
    } catch (error) {
      set({ getPositionStatus: 'error' })
    }
  }
}))
