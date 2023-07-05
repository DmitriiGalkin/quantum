import React, {useState} from 'react';
import dayjs from "dayjs";
import {convertToMeetTime} from "../tools/date";
import {useInputStyles} from "./helper";
const {TimePicker: TimePickerPro} = require('react-ios-time-picker');

interface TimeFieldProps {
    label: string
    value?: string
    onChange?: (date: string) => void
}
export function TimePicker({ label, value: defaultValue, onChange }: TimeFieldProps) {
    const data = dayjs(defaultValue)
    const classes = useInputStyles();

    const [value, setValue] = useState(convertToMeetTime(defaultValue) || '00:00');

    const onChange3 = (timeValue: any) => {
        setValue(timeValue);
        const date = timeValue.split(':');
        onChange && onChange(data.startOf('date').add(Number(date[0]), 'hour').add(Number(date[1]), 'minute').format('YYYY-MM-DD HH:mm:ss'))
    }
    return (
        <div style={{ width: 80 }}>
            <label htmlFor="time">{label}</label>
            <TimePickerPro onChange={onChange3} value={value} controllers={false} inputClassName={classes.input} />
        </div>
    );
}

export default TimePicker;
