import type { TBaseTour } from './tour.types'

export type TBooking = {
  _id: string
  price: number
  tour: TBaseTour
  user: string
}
