import React from 'react';
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import {useNavigate} from "react-router-dom";
import Back2 from "../components/Back2";
import {useMeets} from "../modules/user";

export default function MapDialog() {
    const { data: meets = [] } = useMeets()
    const [x,y] = getCenter(meets)
    const navigate = useNavigate();

    return (
        <>
            <div style={{ position: "absolute", top: 18, left: 16, right: 16, zIndex:10 }}>
                <Back2 title="Карта проектов"/>
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <YMaps>
                    <Map defaultState={{ center: [x, y], zoom: 16 }} width="100%" height="100%">
                        {meets.map((meet) => (
                            <Placemark
                                key={meet.id}
                                modules={["geoObject.addon.balloon"]}
                                defaultGeometry={[meet.x, meet.y]}
                                options={{
                                    preset: 'islands#icon',
                                    iconColor: '#FFA427',
                                }}
                                onClick={() => navigate(`/meet/${meet.id}`)}
                            />
                        ))}
                    </Map>
                </YMaps>
            </div>
        </>
    );
}