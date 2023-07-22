import React from 'react';
import dayjs from "dayjs";
import {convertToMeetTime} from "../tools/date";
import {useInputStyles} from "./helper";
import {DatePickerDefault} from "./DatePicker";

const {TimePicker: ReactIosTimePicker} = require('react-ios-time-picker');

interface TimeFieldProps {
    name: string
    label: string
    value?: string
    onChange: (date: string) => void
}
export function TimePickerDefault({ label, name, value, onChange }: TimeFieldProps) {
    const classes = useInputStyles();

    const onChangeReactIosTimePicker = (timeValue: string) => {
        const date = timeValue.split(':');

        onChange(dayjs(value)
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
                value={convertToMeetTime(value)}
                controllers={false}
                inputClassName={classes.input}
            />
        </div>
    );
}

export const TimePicker = React.memo(TimePickerDefault);
