import SwipeableViews from "react-swipeable-views";
import {Stack} from "@mui/material";
import {MeetCard} from "../cards/MeetCard";
import React, {useRef} from "react";
import {useLocalStorage, useToggle} from "usehooks-ts";
import {getOm} from "../tools/helper";
import {useMeets} from "../tools/service";
import {usePosition} from "../tools/pwa";
import {LocalDate} from "@js-joda/core";
import {Calendar, DialogHeader} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {useAuth} from "../tools/auth";

export interface MeetsProps {
    onClose: () => void
}

function Meets({ onClose }: MeetsProps) {
    const { user } = useAuth();
    const [display, toggleDisplay] = useToggle()
    const containerRef = useRef<HTMLDivElement>(null)
    const containerHeight = containerRef.current?.offsetHeight
    const { data: meets = [], refetch } = useMeets(user.id)
    const [date, setDate] = useLocalStorage<string>('date', LocalDate.now().toString())

    const { index, days, meetsGroup, filteredMeets } = getOm(meets, date)

    return (
        <>
            <DialogHeader title="Календарь встреч" onClick={onClose}/>
            <DialogContent>
                <Stack spacing={3} style={{ height: '100%' }}>
                    <Calendar days={days} onChange={setDate} map={display} />
                    <div style={{ flex: '1 1 auto', overflowY: 'auto' }} ref={containerRef}>
                        <SwipeableViews
                            index={index}
                            onChangeIndex={(index) => setDate(days[index].id)}
                            containerStyle={{ height: containerHeight }}
                            springConfig={{duration: '0.2s', delay: '0s', easeFunction: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)'}}
                            threshold={4}
                        >
                            {meetsGroup.map(({id, meets}) => (
                                <Stack key={id} spacing={2}>
                                    {meets.map((meet) =>
                                        <MeetCard key={meet.id} meet={meet} refetch={refetch} />
                                    )}
                                </Stack>
                            ))}
                        </SwipeableViews>
                    </div>
                </Stack>
                {/*<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>*/}
                {/*    */}
                {/*</div>*/}
            </DialogContent>
        </>
    )
}

export default withDialog(Meets)

