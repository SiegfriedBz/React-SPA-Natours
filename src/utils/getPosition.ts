type TPosition = {
  coords: {
    latitude: number
    longitude: number
  }
}

export default function getPosition(): Promise<TPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
