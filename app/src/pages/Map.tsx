import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import ForwardAppBar from "../components/ForwardAppBar";
import PlaceCard from "../components/PlaceCard";
import {Place, usePlaces} from "../modules/place";
import {Container, Grid, Theme} from "@mui/material";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../tools/auth";

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

export default function MapPage() {
    const classes = useStyles();
    const { data: places = [] } = usePlaces()
    // window.ymaps3.ready.then(() => {
    //     const map = new ymaps3.YMap(document.getElementById('YMapsID'), {
    //         location: {
    //             center: [37.64, 55.76],
    //             zoom: 10
    //         }
    //     });
    // });
    // const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);
    const navigate = useNavigate();
    const [x,y] = getCenter(places)

    const onClickPlace = (place: Place) => {
        navigate(`/place/${place.id}`)
    }

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
                                // properties={{
                                //     balloonContentHeader: place.title,
                                //     balloonContentBody: place.description,
                                // }}
                                options={{
                                    preset: 'islands#icon',
                                    iconColor: '#FFA427',
                                    // balloonMaxWidth: 200,
                                }}
                                onClick={() => onClickPlace(place)}
                            />
                        ))}
                    </Map>
                </YMaps>
            )}
        </div>
    );
}