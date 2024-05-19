export type TReview = {
  _id: string
  content: string
  rating: number
  tour: string
  user: {
    name: string
    photo: string
  }
}
