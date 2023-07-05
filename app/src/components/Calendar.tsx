import React from 'react';
import {Stack} from "@mui/material";
import {CalendarDay} from "../tools/helper";
import {makeStyles} from "@mui/styles";
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
    dayOfWeek: {
        fontSize: '11px',
        fontWeight: 500,
        color: 'black',
        opacity: 0.4
    },
    dayOfWeekActive: {
        opacity: 0.8
    },
    day: {
        position: 'relative',
        paddingTop: '100%',
        width: '100%',
        borderRadius: 100,
        backgroundColor: '#F5F5F5',
        color: '#394F63',
        border: '1px solid rgba(57, 79, 99, 0.1)',
        boxShadow: '0px 2.769230604171753px 12.923076629638672px 0px rgba(0, 0, 0, 0.05)'
    },
    dayActive: {
        backgroundColor: '#394F63',
        color: '#ffffff',
    },
    dayAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    daySquare: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        width: '100%'
    },
    dayP: {
        textAlign: 'center',
        margin:0,
        fontSize: 16,
        fontWeight: 900
    },
    length: {
        position: 'absolute',
        top: -5,
        right: -3,
        width: 17,
        height: 17,
        borderRadius: 100,
        backgroundColor: 'orange',
        color: 'white'
    },
    lengthSquare: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        width: '100%'
    },
    lengthP: {
        textAlign: 'center',
        margin:0,
        fontSize: 8,
        fontWeight: 900
    }
}));

interface CalendarProps {
    week: CalendarDay[]
    onChange?: (date: string) => void
}

export function Calendar ({ week, onChange }: CalendarProps): JSX.Element {
    const classes = useStyles();

    return (
        <Stack spacing={1} direction="row" justifyContent="space-between">
            {week.map(({id, dayOfWeekValue, day, active, meetsLength}, index) =>
                <Stack key={day} spacing={3} direction="column" alignItems="center" onClick={() => { onChange && onChange(id)}} style={{ width: '100%'}}>
                    <div className={clsx(classes.dayOfWeek, active && classes.dayOfWeekActive)}>
                        {dayOfWeekValue}
                    </div>
                    <div className={clsx(classes.day, active && classes.dayActive)}>
                        <div className={classes.dayAbsolute}>
                            <div className={classes.daySquare}>
                                <p className={classes.daySquare}>{day}</p>
                            </div>
                        </div>
                        {Boolean(meetsLength) && (
                            <div className={classes.length}>
                                <div className={classes.lengthSquare}>
                                    <p className={classes.lengthP}>{meetsLength}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Stack>
            )}
        </Stack>
    )
}
