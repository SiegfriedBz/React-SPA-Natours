import { useState } from 'react'
import type { TBaseLocation } from '../../../../types/tour.types'

type TProps = {
  startLocation: TBaseLocation
}

type TViewState = {
  latitude: number
  longitude: number
  zoom: number
}

const useView = ({ startLocation }: TProps) => {
  const [viewState, setViewState] = useState<TViewState>(() => {
    const [startLng, startLat] = startLocation.coordinates

    return { latitude: startLat, longitude: startLng, zoom: 1 }
  })

  return { viewState, setViewState }
}

export default useView
