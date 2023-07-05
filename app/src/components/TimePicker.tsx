import React, {useState} from 'react';
import dayjs from "dayjs";
import {convertToMeetTime} from "../tools/date";
import {useInputStyles} from "./helper";
const {TimePicker: ReactIosTimePicker} = require('react-ios-time-picker');

interface TimeFieldProps {
    name: string
    label: string
    value?: string
    onChange: (date: string) => void
}
export function TimePicker({ label, name, value: defaultValue, onChange }: TimeFieldProps) {
    const classes = useInputStyles();
    const [value, setValue] = useState(convertToMeetTime(defaultValue) || '00:00');

    const onChangeReactIosTimePicker = (timeValue: string) => {
        setValue(timeValue);
        const date = timeValue.split(':');

        onChange(dayjs(defaultValue)
            .startOf('date')
            .add(Number(date[0]), 'hour')
            .add(Number(date[1]), 'minute')
            .format('YYYY-MM-DD HH:mm:ss'))
    }

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <ReactIosTimePicker
                id={name}
                onChange={onChangeReactIosTimePicker}
                value={value}
                controllers={false}
                inputClassName={classes.input}
            />
        </div>
    );
}

export default TimePicker;
