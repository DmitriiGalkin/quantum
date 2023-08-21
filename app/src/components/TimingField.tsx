import React, {ChangeEvent, useState} from 'react';
import {compress} from "../tools/image";
import {useUploadImage} from "../tools/service";
import {makeStyles} from "@mui/styles";
import {Stack} from "@mui/material";
import {TemporalAdjusters} from "@js-joda/core";
import dayOfWeekInMonth = TemporalAdjusters.dayOfWeekInMonth;
import {convertToMeetTime, getDayOfWeekTitle} from "../tools/date";
import {Timing} from "../tools/dto";
import Checkbox from "./Checkbox";
import Switch from "./Switch";
import {useToggle} from "usehooks-ts";
const {TimePicker: ReactIosTimePicker} = require('react-ios-time-picker');

interface TimingFieldProps {
    values: Timing[]
    onChange: (values: Timing[]) => void
}

/**
 * Подготавливает потенциальное расписание
 */
const getTimes = (values: Timing[]) => [0,1,2,3,4,5,6].map(((defaultDayOfWeek) => {
    const lines = values.filter(({ dayOfWeek }) => dayOfWeek === defaultDayOfWeek)

    if (lines.length) {
        return lines.map(line => ({ ...line, checked: true })) as Timing[]
    } else {
        return [
            {
                dayOfWeek: defaultDayOfWeek,
                time: '09:00',
                checked: false
            }
        ] as Timing[]
    }
})).flat()

export function TimingField({ values, onChange }: TimingFieldProps) {
    const [view, toggleView] = useToggle(Boolean(values.length))

    const times = getTimes(values);

    const getCheckedValues = (index: number) => {
        const z = times.map((time, findex)=> index === findex ? ({ ...time, checked: !time.checked }) : time).filter((g)=>g.checked)
        onChange(z)
    }
    const getTimeValues = (index: number, time3: string) => {
        const z = times.map((time, findex)=> index === findex ? ({ ...time, time: time3 }) : time).filter((g)=>g.checked)
        onChange(z)
    }

    return (
        <div>
            <Stack spacing={3} direction="row" alignItems="center">
                <div>Расписание</div>
                <Switch checked={view} onChange={toggleView}/>
            </Stack>
            {view && (
                <Stack spacing={1}>
                    {times.map((time, index ) => {
                        return (
                            <div key={index}>
                                <Stack spacing={3} direction="row" alignItems="center">
                                    <div>{getDayOfWeekTitle(time.dayOfWeek)}</div>
                                    <div>
                                        <ReactIosTimePicker
                                            id={`time-${index}`}
                                            onChange={(f: string) => getTimeValues(index, f)}
                                            value={time.time}
                                            controllers={false}
                                            //inputClassName={classes.input}
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
