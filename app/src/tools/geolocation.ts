import { useState } from 'react'

interface Geo {
  latitude?: string
  longitude?: string
  error: string
  defaultState?: false | { center: number[]; zoom: number }
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
    defaultState: Boolean(latitude) &&
      Boolean(longitude) && { center: [Number(latitude), Number(longitude)], zoom: 16 },
  }
}

const earthRadius = 6371
const greatCircleDistance = (angle: number): number => 2 * Math.PI * earthRadius * (angle / 360)
const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180)
const radiansToDegrees = (radians: number): number => radians * (180 / Math.PI)
const centralSubtendedAngle = (locationX: Point, locationY: Point): number => {
  const locationXLatRadians = degreesToRadians(locationX.latitude)
  const locationYLatRadians = degreesToRadians(locationY.latitude)
  return radiansToDegrees(
    Math.acos(
      Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) +
        Math.cos(locationXLatRadians) *
          Math.cos(locationYLatRadians) *
          Math.cos(degreesToRadians(Math.abs(locationX.longitude - locationY.longitude))),
    ),
  )
}
interface Point {
  latitude: number
  longitude: number
}
export const distanceBetweenLocations = (locationX: Point, locationY: Point): number =>
  Math.round(greatCircleDistance(centralSubtendedAngle(locationX, locationY)) * 1000)

export const getDistanceTitle = (distance: number): string => {
  if (distance < 1000) {
    return `${distance}м.`
  }
  return `>${Math.round(distance / 1000)}км.`
}
