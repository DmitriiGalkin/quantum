import React from 'react';
import {usePlaces} from "../modules/place";
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import {useNavigate} from "react-router-dom";
import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Typography from "@mui/material/Typography";

export default function MapDialog() {
    const { data: places = [] } = usePlaces()
    const [x,y] = getCenter(places)
    const navigate = useNavigate();

    return (
        <div style={{position: 'fixed', zIndex: 1300, right: 0, bottom: 0, top: 0, left: 0 }}>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => window.history.length ? window.history.back() : navigate('/')}
                    >
                        <ArrowBackIos style={{ color: 'white' }}/>
                    </IconButton>
                    <Typography variant="h6" color="white" component="div">
                        Карта проектов
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
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
                            onClick={() => navigate(`/place/${place.id}`)}
                        />
                    ))}
                </Map>
            </YMaps>
        </div>
    );
}