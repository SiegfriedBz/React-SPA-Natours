import type { TUser } from './user.types'
export type TBaseLocation = {
  type: 'Point'
  coordinates: number[]
  description: string
}

export type TLocation = TBaseLocation & {
  day: number
}

export type TBaseTour = {
  _id: string
  name: string
  slug: string
  imageCover: string
  difficulty: 'easy' | 'medium' | 'difficult'
  duration: number
  locations: TLocation[]
  maxGroupSize: number
  ratingsAverage: number
  ratingsCount: number
}

export type TTour = TBaseTour & {
  price: number
  discount: number
  summary: string
  description: string
  images: string[]
  startDates: Date[]
  startLocation: TBaseLocation
  guides: TUser[] | string[]
  createdAt: Date
  updatedAt: Date
}

export type TTourStat = {
  _id: 'easy' | 'medium' | 'difficult' // Assuming TOUR_DIFFICULTY is an array containing these strings
  avgRating: number
  avgPrice: number
  minPrice: number
  maxPrice: number
  totalRatingsCount: number
  totalToursCount: number
}

export type TMonthlyStat = {
  toursStartCount: number
  tours: string[]
  month: number
}

export type TDistanceUnit = 'mi' | 'km'
