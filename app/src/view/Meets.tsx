import React, {useState} from 'react';
import {Stack, ClickAwayListener} from "@mui/material";
import {Calendar, MeetCard} from "../components";
import {CalendarDay} from "../tools/helper";
import SwipeableViews from 'react-swipeable-views';
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {getCenter} from "../tools/map";
import {Meet} from "../tools/dto";

interface MeetsProps {
    week: CalendarDay[]
    day?: CalendarDay
    refetch?: () => void
    setDate: (date: string) => void
    selectedDate?: string
    isMapView?: boolean
}
export default function Meets({week, refetch, day, setDate, isMapView}: MeetsProps) {
    const selectedMeets = week.find(({id}) => id === day?.id)?.meets || []
    const [x,y] = getCenter(selectedMeets)
    const [preview, setPreview] = useState<Meet>()
    return (
        <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
            <div style={{ display: 'block', padding: 15 }}><Calendar week={week} onChange={setDate} /></div>
            <div style={{ overflow: 'auto', flexGrow: 1 }}>
                {!isMapView ? (
                    <SwipeableViews
                        index={day?.index}
                        onChangeIndex={(index) => setDate(week[index].id)}
                        containerStyle={{ height: 400 }}
                        springConfig={{duration: '0.2s', delay: '0s', easeFunction: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)'}}
                        threshold={4}
                    >
                        {week.map(({id, meets}) => (
                            <div key={id} style={{ padding: '0 15px'}}>
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
                        <div style={{ position: 'absolute', top: 170, bottom: 0, left: 0, right: 0 }}>
                            <YMaps>
                                <Map defaultState={{ center: [x, y], zoom: 16 }} width="100%" height="100%">
                                    {selectedMeets.map((meet) => (
                                        <Placemark
                                            key={meet.id}
                                            modules={["geoObject.addon.balloon"]}
                                            defaultGeometry={[meet.latitude, meet.longitude]}
                                            options={{
                                                preset: 'islands#icon',
                                                iconColor: '#FFA427',
                                            }}
                                            onClick={() => setPreview(meet)}
                                        />
                                    ))}
                                </Map>
                            </YMaps>
                        </div>
                        {preview && (
                            <ClickAwayListener onClickAway={() => setPreview(undefined)}>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>

                                    <MeetCard meet={preview} refetch={refetch} />
                            </div>
                            </ClickAwayListener>

                        )}
                    </>
                )}
            </div>
        </div>
    );
}
