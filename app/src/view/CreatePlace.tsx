import React, {useState} from 'react';
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import {usePlaces} from "../tools/service";
import {Place} from "../tools/dto";
import {DialogHeader, TransitionDialog} from "../components";
import Dialog from "@mui/material/Dialog";
import {Stack} from "@mui/material";
import {useToggle} from "usehooks-ts";

interface CreatePlaceProps {
    onClose: () => void
    onSuccess: (place: Place) => void
}
export default function CreatePlace({onSuccess, onClose}: CreatePlaceProps) {
    const { data: places = [] } = usePlaces()
    const [latitude, longitude] = getCenter(places)
    const [openCreatePlace, toggleOpenCreatePlace] = useToggle()

    return (
        <>
            <DialogHeader title="Добавление Места" onClick={onClose}/>
            <div style={{ position: 'absolute', top: 55, bottom: 0, left: 0, right: 0 }}>
                <YMaps>
                    <Map defaultState={{ center: [latitude, longitude], zoom: 16 }} width="100%" height="100%">
                        {places.map((place) => (
                            <Placemark
                                key={place.id}
                                modules={["geoObject.addon.balloon"]}
                                defaultGeometry={[place.latitude, place.longitude]}
                                options={{
                                    preset: 'islands#icon',
                                    iconColor: '#FFA427',
                                }}
                                onClick={() => onSuccess(place)}
                            />
                        ))}
                    </Map>
                </YMaps>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', position: "absolute", right: 18, bottom: 18 }} onClick={() => onOpenCreatePlace(true)}>
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.39px', paddingRight: 15, color: 'black' }}>Добавить Место</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
                        <rect width="54" height="54" rx="23.4" fill="#7139FF"/>
                        <path d="M27.0002 16.875L27.0002 37.125" stroke="white" strokeWidth="2.745" strokeLinecap="round"/>
                        <path d="M16.875 27.0005L37.125 27.0005" stroke="white" strokeWidth="2.745" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
        </>
    );
}
