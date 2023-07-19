import React, {useState} from 'react';
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import {useAddMeet, useAddPlace, usePlaces} from "../tools/service";
import {Meet, Place} from "../tools/dto";
import {Button, DialogHeader, ImageField, Input, TransitionDialog} from "../components";
import Dialog from "@mui/material/Dialog";
import {Box, Stack, SwipeableDrawer} from "@mui/material";
import {useToggle} from "usehooks-ts";
import { styled } from '@mui/material/styles';
import dayjs from "dayjs";
import {makeStyles} from "@mui/styles";
import {convertToMeetsGroupTime} from "../tools/date";

const Puller = styled(Box)(() => ({
    width: 41,
    height: 4,
    backgroundColor: '#D9D9D9',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const useStyles = makeStyles(() => ({
    drawer: {
        zIndex: '1300 !important',
        '& > .MuiPaper-root': {
            height: 'calc(50% - 56px)',
            overflow: 'visible',
        }
    },
}));

interface CreatePlaceProps {
    onClose: () => void
    onSuccess: (place: Place) => void
}
const drawerBleeding = 25;
export default function CreatePlace({onSuccess, onClose}: CreatePlaceProps) {
    const classes = useStyles();
    const addPlace = useAddPlace()

    const { data: places = [] } = usePlaces()
    const [latitude, longitude] = getCenter(places)
    const [drawer, toggleDrawer] = useToggle()
    const container = window !== undefined ? () => window.document.body : undefined;
    const [place, setPlace] = useState<Place>({ id: 0, title: '', latitude: 1, longitude: 2, image: '' })
    const onSave = () => {
        if(place){
            addPlace.mutateAsync(place).then(() => {
                onSuccess(place)
                onClose()
            })
        }
    }

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
            <SwipeableDrawer
                className={classes.drawer}
                container={container}
                anchor="bottom"
                open={drawer}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
                swipeAreaWidth={drawerBleeding}
                ModalProps={{
                    keepMounted: true,
                }}
                BackdropProps={{ invisible: true }}
            >
                <div style={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        backgroundColor: 'white',
                    }}
                >
                    <Puller />
                    <Stack spacing={2} style={{padding: '25px 18px 18px'}}>
                        <Stack spacing={4}>
                            <Input
                                name='title'
                                label="Название"
                                value={place?.title}
                                onChange={(e) => setPlace({ ...place, title: e.target.value} as Place)}
                                placeholder="Введите название встречи"
                            />
                            <ImageField
                                label="Загрузите обложку"
                                value={place?.image}
                                onChange={(image) => {
                                    console.log(image,'image')
                                    setPlace({...place, image} as Place)
                                }}
                            />
                        </Stack>
                        <Button onClick={onSave}>Добавить</Button>
                    </Stack>
                </div>
            </SwipeableDrawer>
        </>
    );
}
