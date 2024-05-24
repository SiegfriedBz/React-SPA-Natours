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
                day > 0
                  ? setPopup({
                      day,
                      description,
                      lat,
                      lng
                    })
                  : setPopup({
                      day: 0,
                      description,
                      lat,
                      lng
                    })
              }}
            >
              <img
                src={day > 0 ? pinGreen : pinOrange}
                className={day > 0 ? 'max-sm:w-6 sm:w-8' : 'max-sm:w-5 sm:w-7'}
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
            className="rounded-xl shadow-xl"
          >
            <CustomPopup day={popup.day} description={popup.description} />
          </Popup>
        )}

        <SwitchMapStyleButton mapStyle={mapStyle} setMapStyle={setMapStyle} />
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
    <div className="h-full w-full text-center max-md:space-y-2 md:space-y-4">
      <p className="max-md:text-sm md:text-base ">Day: {day}</p>
      <p className="max-md:text-sm md:text-base font-semibold ">
        {description}
      </p>
    </div>
  )
}

type TSwitchProps = {
  mapStyle: string
  setMapStyle: React.Dispatch<React.SetStateAction<string>>
}
const SwitchMapStyleButton = ({ mapStyle, setMapStyle }: TSwitchProps) => {
  const isLightMap = mapStyle === MAP_STYLES['light']

  return (
    <button
      onClick={() =>
        setMapStyle((prev) =>
          prev === MAP_STYLES['outdoor']
            ? MAP_STYLES['light']
            : MAP_STYLES['outdoor']
        )
      }
      className={`absolute 
        z-[999] 
        opacity-70
        max-sm:w-16 max-sm:h-16
        w-20 h-20
        rounded-full
        top-1/4 
        max-sm:-translate-y-16
        max-md:-translate-y-24
        max-lg:-translate-y-28
        max-xl:-translate-y-32
        2xl:translate-y-0
        font-extrabold
        right-2 
        ${isLightMap ? 'text-stone-50 hover:text-primary-dark bg-primary-dark hover:bg-stone-100 ring-stone-100 hover:ring-primary-dark' : 'text-primary-dark hover:text-stone-50 bg-stone-100 hover:bg-primary-dark ring-primary-dark hover:ring-stone-100'}
        transition-all duration-300 ease-in-out                   
    `}
    >
      Switch Style
    </button>
  )
}
