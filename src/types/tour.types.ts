export type TTour = {
  _id: string
  name: string
  slug: string
  duration: number
  maxGroupSize: number
  difficulty: 'easy' | 'medium' | 'difficult'
  ratingsAverage: number
  ratingsCount: number
  price: number
  discount: number
  summary: string
  description: string
  imageCover: string
  images: string[]
  startDates: Date[]
  startLocation: object
  locations: object[]
  guides: string[]
  createdAt: Date
  updatedAt: Date
}

export type TTourStat = {
  _id: 'easy' | 'medium' | 'hard' // Assuming TOUR_DIFFICULTY is an array containing these strings
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
