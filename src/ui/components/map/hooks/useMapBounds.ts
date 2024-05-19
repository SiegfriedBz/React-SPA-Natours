import { useCallback, useEffect, useMemo, useRef } from 'react'
import bbox from '@turf/bbox'
import { featureCollection, point } from '@turf/helpers'
import { MAP_BOUNDS_PADDING } from '../map.constants'
import type { MapRef } from 'react-map-gl'
import type { TMarker } from '../../../../types/map.types'

type TProps = {
  mapRef: React.MutableRefObject<MapRef | null>
  markers: TMarker[]
}

const useMapBounds = ({ mapRef, markers }: TProps) => {
  const minLatRef = useRef<number | undefined>(undefined)
  const maxLatRef = useRef<number | undefined>(undefined)

  const markersGeojson = useMemo(() => {
    return featureCollection(
      markers.map((marker: TMarker) => point([marker.lng, marker.lat]))
    )
  }, [markers])

  const getAnchor = useCallback(
    (lat: number) => {
      const isAtTop = lat === maxLatRef.current
      const isAtBottom = lat === minLatRef.current

      return isAtTop ? 'top-left' : isAtBottom ? 'bottom-right' : 'left'
    },
    [maxLatRef, minLatRef]
  )

  useEffect(() => {
    if (!mapRef) return

    // Get window width
    const windowWidth = window.innerWidth
    const screenType =
      windowWidth < 500
        ? 'sm'
        : windowWidth < 1000
          ? 'md'
          : windowWidth < 1278
            ? 'lg'
            : windowWidth < 1500
              ? 'xl'
              : '2xl'

    // Get map bounds padding
    const mapBoundsPadding = MAP_BOUNDS_PADDING[screenType]

    // Calculate & set the bounding box of the map
    const [minLng, minLat, maxLng, maxLat] = bbox(markersGeojson)
    minLatRef.current = minLat
    maxLatRef.current = maxLat

    const timer = setTimeout(() => {
      if (!mapRef.current) return

      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat]
        ],
        {
          padding: mapBoundsPadding,
          duration: 3500
        }
      )

      return () => {
        clearTimeout(timer)
      }
    }, 2500)
  }, [mapRef, markers, markersGeojson])

  return { getAnchor }
}

export default useMapBounds
