export type TUserRole = 'admin' | 'lead-guide' | 'guide' | 'user'

export type TUser = {
  _id: string
  name: string
  email: string
  photo?: string
  role: TUserRole
  isActive: boolean
  latLng?: string
}
