import { useRef, useState } from 'react'
import MapGL, { MapRef, Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import useView from './hooks/useView'
import useMarkers from './hooks/useMarkers'
import useMapBounds from './hooks/useMapBounds'
import pinGreen from '../../../assets/pin-green.png'
import pinOrange from '../../../assets/pin-orange.png'
import { INITIAL_POPUP } from './map.constants'
import type { TBaseLocation, TLocation } from '../../../types/tour.types'
import type { TMarker, TPopup } from '../../../types/map.types'

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY

type TProps = {
  startLocation: TBaseLocation
  locations: TLocation[]
}

const MAP_STYLES = {
  outdoor: 'mapbox://styles/mapbox/outdoors-v12',
  light: 'mapbox://styles/mapbox/light-v11'
}

function Map({ startLocation, locations }: TProps) {
  const [mapStyle, setMapStyle] = useState(() => MAP_STYLES['light'])

  const mapRef = useRef<MapRef | null>(null)
  const [popup, setPopup] = useState<TPopup>(INITIAL_POPUP)
  const { viewState, setViewState } = useView({ startLocation })
  const markers: TMarker[] = useMarkers({ startLocation, locations })
  const { getAnchor } = useMapBounds({ mapRef, markers })

  return (
    <div data-cy="tour-map" className="relative w-full h-[100vw] min-h-[100vw]">
      <MapGL
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_API_KEY}
        mapStyle={mapStyle}
        scrollZoom={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
      >
        {markers.map((marker) => {
          const { day, description, lat, lng } = marker

          return (
            <Marker
              key={description}
              longitude={lng}
              latitude={lat}
              anchor={getAnchor(lat)}
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                // setPopup if not startLocation
                day > 0
                  ? setPopup({
                      day,
                      description,
                      lat,
                      lng
                    })
                  : () => {}
              }}
            >
              <img
                src={day > 0 ? pinOrange : pinGreen}
                className={day > 0 ? 'w-8' : 'w-7'}
                alt="map pin"
              />
            </Marker>
          )
        })}

        {popup.lng && popup.lat && (
          <Popup
            longitude={popup.lng}
            latitude={popup.lat}
            anchor={getAnchor(popup.lat)}
            onClose={() => setPopup(INITIAL_POPUP)}
            closeButton={false}
          >
            <CustomPopup day={popup.day} description={popup.description} />
          </Popup>
        )}

        <button
          onClick={() =>
            setMapStyle((prev) =>
              prev === MAP_STYLES['outdoor']
                ? MAP_STYLES['light']
                : MAP_STYLES['outdoor']
            )
          }
          className="absolute 
            z-[999] 
            opacity-70
            w-20 h-20
            rounded-full
            top-1/4 
            max-sm:-translate-y-20
            max-md:-translate-y-24
            max-lg:-translate-y-28
            max-xl:-translate-y-32
            2xl:translate-y-0
            right-2 
            
            font-extrabold
          text-primary-dark 
            ring-2 ring-primary-dark
          bg-stone-100
          hover:text-stone-50
          hover:ring-stone-100
          hover:bg-primary-dark
            transition-all duration-300 ease-in-out
          "
        >
          Switch Style
        </button>
      </MapGL>
    </div>
  )
}
export default Map

type TCustomPopupProps = {
  day?: number
  description?: string
}
const CustomPopup = ({ day, description }: TCustomPopupProps) => {
  return (
    <div className="rounded-3xl px-2 py-1 md:px-4 md:py-2 text-center space-y-2 md:space-y-4">
      <p className="text-lg md:text-xl font-semibold">Day: {day}</p>
      <p className="text-lg md:text-xl font-light">{description}</p>
    </div>
  )
}
