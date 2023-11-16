import SwipeableViews from "react-swipeable-views";
import {ClickAwayListener, Stack} from "@mui/material";
import {MeetCard} from "../cards/Meet";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import React, {useRef, useState} from "react";
import {useLocalStorage, useToggle} from "usehooks-ts";
import {getOm} from "../tools/helper";
import {useMeets} from "../tools/service";
import {usePosition} from "../tools/pwa";
import {YMapsApi} from "@pbe/react-yandex-maps/typings/util/typing";
import {LocalDate} from "@js-joda/core";

export default function MainView(): JSX.Element {
    const [display, toggleDisplay] = useToggle()
    const containerRef = useRef<HTMLDivElement>(null)
    const containerHeight = containerRef.current?.offsetHeight
    const { data: meets = [], refetch } = useMeets(coords)
    const coords = usePosition()
    const [ymaps, setYmaps] = useState<YMapsApi>();
    const [selectedMeetId, setSelectedMeetId] = useState<number>()
    const [date, setDate] = useLocalStorage<string>('date', LocalDate.now().toString())

    const selectedMeet = meets.find(({id}) => id === selectedMeetId)

    const { index, days, meetsGroup, filteredMeets } = getOm(meets, date)
    return (
        <div style={{ flex: '1 1 auto', overflowY: 'auto' }} ref={containerRef}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ overflow: 'auto', flexGrow: 1 }}>
                {!display ? (
                    <SwipeableViews
                        index={index}
                        onChangeIndex={(index) => setDate(days[index].id)}
                        containerStyle={{ height: containerHeight }}
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
                            <div style={{ position: 'absolute', top: 152, bottom: 0, left: 0, right: 0 }}>
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
                                                onClick={() => setSelectedMeetId(meet.id)}
                                                // options={{
                                                //     iconLayout: getLayout(meet),
                                                // }}
                                                options={{ preset: 'islands#icon', iconColor: '#FFA427' }}
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
        </div>
    )
}
