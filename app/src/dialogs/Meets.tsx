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
import {Calendar, DialogHeader} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";

export interface MeetsProps {
    onClose: () => void
}

function Meets({ onClose }: MeetsProps) {
    const [display, toggleDisplay] = useToggle()
    const containerRef = useRef<HTMLDivElement>(null)
    const containerHeight = containerRef.current?.offsetHeight
    const coords = usePosition()
    const { data: meets = [], refetch } = useMeets(coords)
    const [date, setDate] = useLocalStorage<string>('date', LocalDate.now().toString())

    const { index, days, meetsGroup, filteredMeets } = getOm(meets, date)

    return (
        <>
            <DialogHeader title="Календарь встреч" onClick={onClose}/>
            <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: 15 }}><Calendar days={days} onChange={setDate} map={display} /></div>
            <div style={{ flex: '1 1 auto', overflowY: 'auto' }} ref={containerRef}>
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
            </div>
        </div>
            </DialogContent>
        </>
    )
}

export default withDialog(Meets)

