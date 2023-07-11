import React from 'react';
import {Stack} from "@mui/material";
import {Calendar, MeetCard} from "../components";
import {CalendarDay} from "../tools/helper";
import SwipeableViews from 'react-swipeable-views';

interface MeetsProps {
    week: CalendarDay[]
    day?: CalendarDay
    refetch?: () => void
    setDate: (date: string) => void
    selectedDate?: string
}
export default function Meets({week, refetch, day, setDate}: MeetsProps) {
    return (
        <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
            <div style={{ display: 'block', padding: 15 }}><Calendar week={week} onChange={setDate} /></div>
            <div style={{ overflow: 'auto' }}>
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
            </div>
        </div>
    );
}
