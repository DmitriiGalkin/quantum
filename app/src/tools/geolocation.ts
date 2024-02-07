import {useState} from "react";

export const useGeolocation = () => {
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [error, setError] = useState('')

    function onSuccess(position: any) {
        // Ужасный костыль
        if (position?.coords?.latitude > 0) {
            setLatitude(position?.coords?.latitude)
            setLongitude(position?.coords?.longitude)
        }
    }

    function onError() {
        setError("Unable to retrieve your location")
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        setError("Geolocation is not supported by your browser")
    }

    // console.log(latitude, longitude, 'useGeolocation')

    return {
        latitude,
        longitude,
        error,
        defaultState: latitude && longitude && { center: [latitude, longitude], zoom: 16 }
    }
}