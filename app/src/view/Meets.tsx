import React, {useEffect, useMemo, useRef, useState} from 'react';
import SwipeableViews from "react-swipeable-views";
import {ClickAwayListener, Stack} from "@mui/material";
import {Calendar, MeetCard, Map2} from "../components";
import {Map, Placemark, useYMaps, YMaps} from "@pbe/react-yandex-maps";
import {getOm} from "../tools/helper";
import {useMeets} from "../tools/service";
import {usePosition} from "../tools/pwa";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import {YMapsApi} from "@pbe/react-yandex-maps/typings/util/typing";
import {makeStyles} from "@mui/styles";
import {Meet} from "../tools/dto";

interface MeetsProps {
    display: boolean
}
const useStyles = makeStyles(() => ({
    container: {
        position: 'relative',
    },
    blank: {
        position: 'absolute',
        left: -46,
        top: -78,
        width: 121,
        height: 130,
        backgroundImage: 'url("http://localhost:3000/blank-place.png")',
    },
    image: {
        position: 'absolute',
        left: -24,
        top: -63,
        width: 48,
        height: 48,
        backgroundImage: "url('http://localhost:3000/e052b16f-fddc-4586-8d7b-47ef7c03d494.jpeg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: 18.15,
    },
    label: {
        position: 'absolute',
        left: 40,
        top: -48,
        backgroundColor: 'rgba(0, 0, 0, 0.80)',
        padding: '3px 9px',
        color: '#ffffff',
        lineHeight: '12px',
        fontWeight: 500,
        fontSize: 12,
        borderRadius: 6,
        letterSpacing: '0.55px',
        whiteSpace: 'nowrap',
    }
}));
export function Meets({ display }: MeetsProps) {
    const classes = useStyles();

    const coords = usePosition()
    const [ymaps, setYmaps] = useState<YMapsApi>();

    const { data: meets = [], refetch } = useMeets(coords)
    const [selectedMeetId, setSelectedMeetId] = useState<number>()
    const [date, setDate] = useLocalStorage<string>('date', LocalDate.now().toString())
    // const ymaps = useYMaps(['Map'])
    const getLayout = (meet: Meet) => {
        if (ymaps) {
            var s = ymaps.templateLayoutFactory.createClass(
                `<div class="pin ${classes.container}"><div class="${classes.blank}"></div><div class="${classes.image}"></div><div class="${classes.label}">${meet.title}</div></div>`,
                // {
                //     build: function() {
                //         this.constructor.superclass.build.call(this);
                //         const pinContainer = this.getParentElement().getElementsByClassName(
                //             'pin',
                //         )[0];
                //         console.log(pinContainer,'pinContainer')
                //     }
                }
            )
            return s
        }
    }

    const selectedMeet = meets.find(({id}) => id === selectedMeetId)
    const { index, days, meetsGroup, filteredMeets } = getOm(meets, date)
    // Тут создаю template для проброса в iconLayout, о createPinTemplateFactory дальше
    // const pin = useSelector(createMapPlacemarkByIdSelector(id)) as PinData;    if (!mapInstanceRef) return null;
    // const template = createPinTemplateFactory(mapInstanceRef)({
    //     onPinClick: onClick,
    //     description: pin.description,
    //     isActive: pin.isActive,
    //     isViewed: pin.isViewed,
    // });

    // useEffect(() => {
    //     if (!ymaps || !mapRef.current) {
    //         return;
    //     }
    //
    //     new ymaps.Map(mapRef.current, {
    //         center: [55.76, 37.64],
    //         zoom: 10,
    //     });
    // }, [ymaps]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: display ? 'rgba(34, 52, 69, .8)' : undefined, zIndex: 2 }}>
                <div style={{ display: 'block', padding: 15 }}><Calendar days={days} onChange={setDate} map={display} /></div>
            </div>
            <div style={{ overflow: 'auto', flexGrow: 1 }}>
                {!display ? (
                    <SwipeableViews
                        index={index}
                        onChangeIndex={(index) => setDate(days[index].id)}
                        containerStyle={{ height: 400 }}
                        springConfig={{duration: '0.2s', delay: '0s', easeFunction: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)'}}
                        threshold={4}
                    >
                        {meetsGroup.map(({id, meets}) => (
                            <div key={id} style={{ padding: '5px 15px'}}>
                                <Stack spacing={2}>
                                    {meets.map((meet) =>
                                        <div key={meet.id}>
                                            <MeetCard meet={meet} refetch={refetch} />
                                        </div>
                                    )}
                                </Stack>
                            </div>
                        ))}
                    </SwipeableViews>
                ) : (
                    <>
                        {coords.latitude && coords.longitude && (
                            <div style={{ position: 'absolute', top: 54, bottom: 0, left: 0, right: 0 }}>
                                {/*<Map2 state={{ center: [coords.latitude, coords.longitude], zoom: 13 }} meets={filteredMeets} setSelectedMeetId={setSelectedMeetId} />*/}
                                {/*<div ref={mapRef} style={{ width: '100%', height: '100%' }} />*/}

                                <YMaps>
                                    <Map defaultState={{ center: [coords.latitude, coords.longitude], zoom: 16 }} width="100%" height="100%"
                                         onLoad={ymaps => setYmaps(ymaps)}
                                        modules={['templateLayoutFactory',"geoObject.addon.balloon"]}
                                        >
                                        {filteredMeets.map((meet) => (
                                            <Placemark
                                                key={meet.id}
                                                defaultGeometry={[meet.latitude, meet.longitude]}
                                                iconContent='12'
                                                // options={{ preset: 'islands#icon', iconColor: '#FFA427' }}
                                                onClick={() => setSelectedMeetId(meet.id)}
                                                options={{
                                                    iconLayout: getLayout(meet),
                                                }}
                                            />
                                        ))}
                                    </Map>
                                </YMaps>
                            </div>
                        )}
                        {selectedMeetId && selectedMeet && (
                            <ClickAwayListener onClickAway={() => setSelectedMeetId(undefined)}>
                                <div style={{ position: 'absolute', bottom: 15, left: 15, right: 15 }}>
                                    <MeetCard meet={selectedMeet} refetch={refetch} />
                                </div>
                            </ClickAwayListener>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
