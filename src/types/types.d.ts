declare module '@turf/bbox' {
  import { AllGeoJSON } from '@turf/helpers'

  function bbox(geojson: AllGeoJSON): [number, number, number, number]
  export default bbox
}

declare module '@turf/helpers' {
  export type Position = [number, number] | [number, number, number]
  export type Properties = { [name: string]: unknown }
  export type GeometryObject = { type: string; coordinates: Position }
  export type Feature<G extends GeometryObject, P = Properties> = {
    type: 'Feature'
    geometry: G
    properties: P
  }
  export type FeatureCollection<G extends GeometryObject, P = Properties> = {
    type: 'FeatureCollection'
    features: Feature<G, P>[]
  }

  export function point(
    coordinates: Position,
    properties?: Properties
  ): Feature<{ type: 'Point'; coordinates: Position }, Properties>

  export function featureCollection<G extends GeometryObject, P = Properties>(
    features: Feature<G, P>[]
  ): FeatureCollection<G, P>
}
