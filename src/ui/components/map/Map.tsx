import { useRef, useState, useEffect, useMemo } from 'react'
import MapGL, { MapRef, Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import bbox from '@turf/bbox'
import { featureCollection, point } from '@turf/helpers'
import pinOrange from '../../../assets/pin-orange.png'
import { INITIAL_POPUP, MAP_BOUNDS_PADDING } from './map.constants'
import type { TBaseLocation, TLocation } from '../../../types/tour.types'
import type { TMarker, TPopup } from '../../../types/map.types'

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY

type TProps = {
  startLocation: TBaseLocation
  locations: TLocation[]
}

function Map({ startLocation, locations }: TProps) {
  const mapRef = useRef<MapRef | null>(null)
  const [startLng, startLat] = startLocation.coordinates
  const INITIAL_VIEW_STATE = {
    latitude: startLat,
    longitude: startLng,
    zoom: 1
  }
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
  const [popup, setPopup] = useState<TPopup>(INITIAL_POPUP)

  const markers: TMarker[] = useMemo(() => {
    return locations.map((location) => {
      const {
        day,
        description,
        coordinates: [lng, lat]
      } = location
      return { day, description, lat, lng }
    })
  }, [locations])

  const markersGeojson = featureCollection(
    markers.map((marker: TMarker) => point([marker.lng, marker.lat]))
  )

  useEffect(() => {
    // calculate the bounding box of the map
    const [minLng, minLat, maxLng, maxLat] = bbox(markersGeojson)

    const timer = setTimeout(() => {
      if (!mapRef.current) return

      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat]
        ],
        {
          padding: MAP_BOUNDS_PADDING,
          duration: 3500
        }
      )

      return () => {
        clearTimeout(timer)
      }
    }, 2500)
  }, [mapRef, markersGeojson])

  return (
    <MapGL
      ref={mapRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: '100%', height: 600 }}
      mapboxAccessToken={MAPBOX_API_KEY}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
    >
      {markers.map((marker) => {
        const { day, description, lat, lng } = marker
        return (
          <Marker
            key={description}
            longitude={lng}
            latitude={lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopup({
                day,
                description,
                lat,
                lng
              })
            }}
          >
            <img src={pinOrange} className="w-8" />
          </Marker>
        )
      })}

      {popup.lng && popup.lat && (
        <div className="z-[10000] p-4">
          <Popup
            longitude={popup.lng}
            latitude={popup.lat}
            anchor="bottom"
            onClose={() => setPopup(INITIAL_POPUP)}
          >
            <p>{popup.day}</p>
            <p>{popup.description}</p>
          </Popup>
        </div>
      )}
    </MapGL>
  )
}
export default Map
