import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import ForwardAppBar from "../components/ForwardAppBar";
import {usePlaces} from "../modules/place";
import {Theme} from "@mui/material";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import {PlaceDialog} from "./PlaceDialog";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    root2: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function MapDialog() {
    const classes = useStyles();
    const { data: places = [] } = usePlaces()
    const [placeId, setPlaceId] = useState<number>()
    const [x,y] = getCenter(places)

    return (
        <div className={classes.root}>
            <ForwardAppBar title="Карта проектов"/>
            {places.length && (
                <YMaps>
                    <Map
                        defaultState={{
                            center: [x, y],
                            zoom: 17,
                        }}
                        width="100%"
                        height="100%"
                    >
                        {places.map((place) => (
                            <Placemark
                                modules={["geoObject.addon.balloon"]}
                                defaultGeometry={[place.x, place.y]}
                                options={{
                                    preset: 'islands#icon',
                                    iconColor: '#FFA427',
                                }}
                                onClick={() => setPlaceId(place.id)}
                            />
                        ))}
                    </Map>
                </YMaps>
            )}
            {placeId && <PlaceDialog placeId={placeId} onClose={() => setPlaceId(undefined)} />}
        </div>
    );
}