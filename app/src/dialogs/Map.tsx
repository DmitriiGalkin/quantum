import React from 'react';
import {usePlaces} from "../modules/place";
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import {useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components/TransitionDialog";
import Back from "../components/Back";

interface MapDialogProps {
    onClose: ()=>void
    open: boolean
}
export default function MapDialog({onClose, open}: MapDialogProps) {
    const { data: places = [] } = usePlaces()
    const [x,y] = getCenter(places)
    const navigate = useNavigate();

    return (
        <Dialog onClose={onClose} open={open} fullScreen keepMounted TransitionComponent={TransitionDialog}>
            <Back title="Карта проектов" onClick={onClose}/>
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
        </Dialog>
    );
}