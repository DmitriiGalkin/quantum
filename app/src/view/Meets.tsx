import React, {useMemo, useState} from 'react';
import SwipeableViews from "react-swipeable-views";
import {ClickAwayListener, Stack} from "@mui/material";
import {Calendar, MeetCard} from "../components";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {getOm} from "../tools/helper";
import {useMeets} from "../tools/service";
import {usePosition} from "../tools/pwa";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";

interface MeetsProps {
    display: boolean
}
export function Meets({ display }: MeetsProps) {
    const coords = usePosition()
    const { data: meets = [], refetch } = useMeets(coords)
    const [selectedMeetId, setSelectedMeetId] = useState<number>()
    const [date, setDate] = useLocalStorage<string>('date', LocalDate.now().toString())

    const selectedMeet = meets.find(({id}) => id === selectedMeetId)
    const { index, days, meetsGroup, filteredMeets } = getOm(meets, date)

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
                                {/*<Map2 state={{ center: [latitude, longitude], zoom: 13 }} meets={filteredMeets} />*/}
                                <YMaps>
                                    <Map defaultState={{ center: [coords.latitude, coords.longitude], zoom: 16 }} width="100%" height="100%">
                                        {filteredMeets.map((meet) => (
                                            <Placemark
                                                key={meet.id}
                                                modules={["geoObject.addon.balloon"]}
                                                defaultGeometry={[meet.latitude, meet.longitude]}
                                                iconContent='12'
                                                options={{ preset: 'islands#icon', iconColor: '#FFA427' }}
                                                onClick={() => setSelectedMeetId(meet.id)}
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
