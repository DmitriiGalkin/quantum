import React from 'react';
import {Stack} from "@mui/material";
import {Calendar, MeetCard} from "../components";
import {CalendarDay} from "../tools/helper";
import {Meet} from "../tools/dto";
import SwipeableViews from 'react-swipeable-views';

interface MeetsProps {
    week: CalendarDay[]
    refetch?: () => void
    onChangeDay: (date: string) => void
    selectedMeet?: Meet
    selectedDate?: string
}
export default function Meets({week, refetch, onChangeDay, selectedMeet, selectedDate}: MeetsProps) {
    const [value, setValue] = React.useState(week.findIndex(({ id }) => id === selectedDate));

    const handleChangeIndex = (index: number) => {
        const date = week[index]?.id
        onChangeDay(date)
        setValue(index);
    };

    const onChangeCalendarDay = (date: string) => {
        onChangeDay(date)
        setValue(week.findIndex(({ id }) => id === date));
    };

    console.log(value,'value')
    console.log(week,'week')

    return (
        <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
            <div style={{ display: 'block', padding: 15 }}><Calendar week={week} onChange={onChangeCalendarDay} /></div>
            <div style={{     overflow: 'auto' }}>
                <SwipeableViews
                    index={value}
                    onChangeIndex={handleChangeIndex}
                    containerStyle={{ height: 400 }}
                >
                    {week.map(({id, meets}) => (
                        <div key={id} style={{ padding: '0 15px'}}>
                            <Stack spacing={2}>
                                {meets.map((meet) =>
                                    <div key={meet.id}>
                                        <MeetCard meet={meet} selected={selectedMeet?.id === meet.id} refetch={refetch} />
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
