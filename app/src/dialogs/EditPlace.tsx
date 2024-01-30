import React, {useRef, useState} from 'react';
import {Map, YMaps} from '@pbe/react-yandex-maps';
import {useAddPlace} from "../tools/service";
import {Place} from "../tools/dto";
import {Button, DialogHeader, ImageField, Input} from "../components";
import {Box, Stack, SwipeableDrawer} from "@mui/material";
import {useToggle} from "usehooks-ts";
import {styled} from '@mui/material/styles';
import {makeStyles} from "@mui/styles";
import {withDialog} from "../components/helper";

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

interface EditPlaceProps {
    state: { center: number[], zoom: number }
    onClose: () => void
    onSuccess: (place: Place) => void
}
const drawerBleeding = 25;
function EditPlace({ state, onSuccess, onClose }: EditPlaceProps) {
    const classes = useStyles();
    const map = useRef();
    const addPlace = useAddPlace()

    const [drawer, toggleDrawer] = useToggle(true)
    const container = window !== undefined ? () => window.document.body : undefined;
    const [place, setPlace] = useState<Place>({ id: 0, title: '', latitude: '1', longitude: '2', image: '' })
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
            <DialogHeader title="Добавление Места" onClick={onClose} isClose />
            <div style={{ position: 'absolute', top: 54, bottom: 0, left: 0, right: 0 }}>
                <div style={{ position: 'absolute', top: 'calc(33.33% - 46px)', left: 'calc(50% - 13px)', zIndex:5000 }}>
                    <svg width="26" height="46" viewBox="0 0 26 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="13" cy="13" r="12" fill="#FFA028" stroke="#394F63" strokeWidth="2"/>
                        <path d="M13 25L13 45" stroke="#394F63" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <YMaps>
                    <Map
                        instanceRef={map}
                        onBoundsChange={(xx: any)=>{
                            const [[x1,y1], [x2,y2]] = xx.originalEvent.newBounds
                            const latitude = x1 + (x2 - x1)/3*2
                            const longitude = y1 + (y2 - y1)/2
                            setPlace({...place, latitude, longitude})
                        }}
                        defaultState={state}
                        width="100%" height="100%"
                    />
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
                                name="placeImage"
                                label="Загрузите обложку"
                                value={place?.image}
                                onChange={(image) => setPlace({...place, image} as Place)}
                            />
                        </Stack>
                        <Button onClick={onSave}>Добавить</Button>
                    </Stack>
                </div>
            </SwipeableDrawer>
        </>
    );
}

export default withDialog(EditPlace)
