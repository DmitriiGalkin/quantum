import { useState } from 'react'

interface Geo {
  latitude?: string
  longitude?: string
  error: string
  defaultState?: false | { center: (string | undefined)[]; zoom: number }
}
export const useGeolocation = (): Geo => {
  const [latitude, setLatitude] = useState<string>()
  const [longitude, setLongitude] = useState<string>()
  const [error, setError] = useState('')

  function onSuccess(position: GeolocationPosition) {
    // Ужасный костыль
    if (position?.coords?.latitude > 0) {
      setLatitude(String(position?.coords?.latitude))
      setLongitude(String(position?.coords?.longitude))
    }
  }

  function onError() {
    setError('Unable to retrieve your location')
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
    setError('Geolocation is not supported by your browser')
  }

  return {
    latitude,
    longitude,
    error,
    defaultState: Boolean(latitude) && Boolean(longitude) && { center: [latitude, longitude], zoom: 16 },
  }
}
