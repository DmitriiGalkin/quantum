import React from 'react';
import {usePlaces} from "../modules/place";
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import {useNavigate} from "react-router-dom";
import Back2 from "../components/Back2";

export default function MapDialog() {
    const { data: places = [] } = usePlaces()
    const [x,y] = getCenter(places)
    const navigate = useNavigate();

    return (
        <>
            <div style={{ position: "absolute", top: 25, left: 21, right: 25, zIndex:10 }}>
                <Back2 title="Карта проектов"/>
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <YMaps>
                    <Map defaultState={{ center: [x, y], zoom: 16 }} width="100%" height="100%">
                        {places.map((place) => (
                            <Placemark
                                key={place.id}
                                modules={["geoObject.addon.balloon"]}
                                defaultGeometry={[place.x, place.y]}
                                options={{
                                    preset: 'islands#icon',
                                    iconColor: '#FFA427',
                                }}
                                onClick={() => navigate(`/place/${place.id}`)}
                            />
                        ))}
                    </Map>
                </YMaps>
            </div>
        </>
    );
}