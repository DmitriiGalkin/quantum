import React from 'react';
import {Stack} from "@mui/material";
import {getDayOfWeekTitleLong} from "../tools/date";
import {Timing} from "../tools/dto";
import Checkbox from "./Checkbox";
import Switch from "./Switch";
import {useToggle} from "usehooks-ts";
import {useInputStyles} from "./helper";

const {TimePicker: ReactIosTimePicker} = require('react-ios-time-picker');

interface TimingFieldProps {
    values: Timing[]
    onChange: (values: Timing[]) => void
}

interface ExtendedTiming extends Timing {
    checked: boolean
}

/**
 * Подготавливает вывод расписания
 */
const getTimes = (values: Timing[]) => [0,1,2,3,4,5,6].map(((defaultDayOfWeek) => {
    const lines = values.filter(({ dayOfWeek }) => dayOfWeek === defaultDayOfWeek)

    if (lines.length) {
        return lines.map(line => ({ ...line, checked: true })) as ExtendedTiming[]
    } else {
        return [
            {
                dayOfWeek: defaultDayOfWeek,
                time: '09:00',
                checked: false
            }
        ] as ExtendedTiming[]
    }
})).flat()

/**
 * Адаптер вывода расписания в данные на бек
 */
const getTiming = (times: ExtendedTiming[]): Timing[] => {
    return times.filter((g)=>g.checked)
        .map((data) => ({
            id: data.id,
            dayOfWeek: data.dayOfWeek,
            time: data.time,
        }))
}

export function TimingField({ values, onChange }: TimingFieldProps) {
    const [view, toggleView] = useToggle()
    const classes = useInputStyles();

    const times = getTimes(values);

    const getCheckedValues = (checkedIndex: number) => {
        const z = times
            .map((time, index)=> checkedIndex === index ? ({ ...time, checked: !time.checked }) : time)
        onChange(getTiming(z))
    }
    const getTimeValues = (index: number, time3: string) => {
        const z = times
            .map((time, findex)=> index === findex ? ({ ...time, time: time3 }) : time)
        onChange(getTiming(z))
    }

    return (
        <div>
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
                <div>Расписание</div>
                <Switch checked={view} onChange={toggleView}/>
            </Stack>
            {view && (
                <Stack spacing={1} className={classes.input} >
                    {times.map((time, index ) => {
                        return (
                            <div key={index}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <div style={{ flexGrow: 1 }}>{getDayOfWeekTitleLong(time.dayOfWeek)}</div>
                                    <div style={{ width: 50 }}>
                                        <ReactIosTimePicker
                                            id={`time-${index}`}
                                            onChange={(f: string) => getTimeValues(index, f)}
                                            value={time.time}
                                            controllers={false}
                                            inputClassName={classes.timePicker}
                                        />
                                    </div>
                                    <Checkbox checked={time.checked} onChange={() => getCheckedValues(index)}/>
                                </Stack>
                            </div>
                        )
                    })}
                </Stack>
            )}
        </div>
    );
}
