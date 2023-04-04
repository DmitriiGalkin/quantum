import React from 'react';
import ForwardAppBar from "../components/ForwardAppBar";
import {usePlaces} from "../modules/place";
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components/TransitionDialog";

interface MapDialogProps {
    onClose: ()=>void
    setPlaceId: (placeId: number) => void
    open: boolean
    setOpenPlace: (isOpen: boolean)=> void
}
export default function MapDialog({onClose, open, setPlaceId, setOpenPlace}: MapDialogProps) {
    const { data: places = [] } = usePlaces()
    const [x,y] = getCenter(places)

    return (
        <Dialog onClose={onClose} open={open} fullScreen keepMounted TransitionComponent={TransitionDialog}>
            <ForwardAppBar title="Карта проектов" onClick={onClose}/>
            {places.length && (
                <YMaps>
                    <Map
                        defaultState={{
                            center: [x, y],
                            zoom: 12,
                        }}
                        width="100%"
                        height="100%"
                    >
                        {places.map((place) => (
                            <Placemark
                                key={place.id}
                                modules={["geoObject.addon.balloon"]}
                                defaultGeometry={[place.x, place.y]}
                                options={{
                                    preset: 'islands#icon',
                                    iconColor: '#FFA427',
                                }}
                                onClick={() => {
                                    setPlaceId(place.id)
                                    setOpenPlace(true)
                                }}
                            />
                        ))}
                    </Map>
                </YMaps>
            )}
        </Dialog>
    );
}