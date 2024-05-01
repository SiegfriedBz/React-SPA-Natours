type TBase = {
  day?: number
  description?: string
  lat?: number
  lng?: number
}

export type TMarker = Required<TBase>
export type TPopup = TBase
