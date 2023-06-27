import React from 'react';
import {Stack} from "@mui/material";
import {getWeek} from "../../tools/helper";
import Calendar from "../Calendar";
import dayjs from "dayjs";

interface DateFieldProps {
    label: string
    selectedDate?: string
    onChange: (date: string) => void
}
export function DatePicker({ label, selectedDate, onChange }: DateFieldProps) {
    const selectedDate2 = dayjs(selectedDate).format('YYYY-MM-DD')
    const week = getWeek(selectedDate2)

    return (
        <Stack spacing={2} direction="column">
            <div style={{ fontWeight: 900, fontSize: 13, color: '#070707', letterSpacing: '0.01em' }}>
                {label}
            </div>
            <div>
                <Calendar week={week} onChange={onChange} />
            </div>
        </Stack>
    );
}

export default DatePicker;
