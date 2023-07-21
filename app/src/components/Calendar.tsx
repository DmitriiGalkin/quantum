import React from 'react';
import {Stack} from "@mui/material";
import {Day} from "../tools/helper";
import { MemoizedCalendarDay } from './CalendarDay';

interface CalendarProps {
    days: Day[]
    onChange: (date: string) => void
    map?: boolean
}

export function Calendar ({ days, onChange, map }: CalendarProps): JSX.Element {
    return (
        <Stack spacing={1} direction="row">
            {days.map(f=>({...f,meets: undefined})).map((day) => <MemoizedCalendarDay key={day.id} {...day} map={map} onClick={onChange} />)}
        </Stack>
    )
}
