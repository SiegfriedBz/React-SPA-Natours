import { useMemo } from 'react'
import type { TBaseLocation, TLocation } from '../../../../types/tour.types'

type TProps = {
  startLocation: TBaseLocation
  locations: TLocation[]
}

const useMarkers = ({ startLocation, locations }: TProps) => {
  return useMemo(
    () =>
      [{ ...startLocation, day: -1 }, ...locations].map(
        ({ day, description, coordinates: [lng, lat] }) => ({
          day,
          description,
          lat,
          lng
        })
      ),
    [startLocation, locations]
  )
}

export default useMarkers
