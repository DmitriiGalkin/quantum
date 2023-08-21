import React, {ChangeEvent} from 'react';
import {compress} from "../tools/image";
import {useUploadImage} from "../tools/service";
import {makeStyles} from "@mui/styles";
import {Stack} from "@mui/material";
import {TemporalAdjusters} from "@js-joda/core";
import dayOfWeekInMonth = TemporalAdjusters.dayOfWeekInMonth;
import {getDayOfWeekTitle} from "../tools/date";
import {Timing} from "../tools/dto";
import Checkbox from "./Checkbox";

interface TimingFieldProps {
    values: Timing[]
    onChange: (values: Timing[]) => void
}

const getTimes = (values: Timing[]) => [0,1,2,3,4,5,6].map(((defaultDayOfWeek) => {
    const lines = values.filter(({ dayOfWeek }) => dayOfWeek === defaultDayOfWeek)

    if (lines.length) {
        return lines.map(line => ({ ...line, checked: true })) as Timing[]
    } else {
        return [
            {
                dayOfWeek: defaultDayOfWeek,
                time: '9:00',
                checked: false
            }
        ] as Timing[]
    }
})).flat()

export function TimingField({ values, onChange }: TimingFieldProps) {
    const times = getTimes(values);

    const getCheckedValues = (index: number) => {
        const z = times.map((time, findex)=> index === findex ? ({ ...time, checked: !time.checked }) : time).filter((g)=>g.checked)
        onChange(z)
    }

    return (
        <div>
            <div>Расписание</div>
            {times.map((time, index ) => {
                return (
                    <div key={index}>
                        <Stack spacing={3} direction="row" alignItems="center">
                            <div>{getDayOfWeekTitle(time.dayOfWeek)}</div>
                            <div>{time.time ?? '9:00'}</div>
                            <Checkbox checked={time.checked} onChange={() => getCheckedValues(index)}/>
                        </Stack>
                    </div>
                )
            })}
        </div>
    );
}
