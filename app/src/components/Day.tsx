import React from 'react';
import {Meet} from "../modules/meet";
import {getMonthShortTitle} from "../tools/date";
import {Divider, Typography, Theme} from "@mui/material";
import { makeStyles } from '@mui/styles';
import {LocalDate} from "@js-joda/core";
import MeetCard from "./MeetCard";

const useStyles = makeStyles((theme: Theme) => ({
    meetsGroup: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        paddingBottom: theme.spacing(2),
    },
    date: {
        position: 'sticky',
        top: 0,
        padding: '12px 0',
        textAlign: 'center',
    },
    meets: {
        '& > div:first-child > div': {
            borderRadius: '0 12px 0 0',
        },
        '& > div:last-child > div': {
            borderRadius: '0 0 12px 0',
        },
    },
}));

interface DayProps {
    date: string
    meets: Meet[]
}
export default function Day({ date, meets }: DayProps): JSX.Element {
    const classes = useStyles();
    const localDate = LocalDate.parse(date)
    const day = localDate.dayOfMonth()
    const monthShortTitle = getMonthShortTitle(localDate.monthValue())
    return (
        <div className={classes.meetsGroup} key={date}>
            <div>
                <div className={classes.date}>
                    <Typography style={{ fontFamily: 'Bebas Neue', fontSize: 26, lineHeight: '28px' }}>
                        {day}
                    </Typography>
                    <Typography variant="subtitle1" style={{ fontSize: 13, fontWeight: 700 }}>
                        {monthShortTitle}
                    </Typography>
                </div>
            </div>
            <div style={{ flexGrow: 1 }} className={classes.meets}>
                {meets.map((meet, index) =>
                    <div key={meet.id}>
                        {Boolean(index) && <Divider light variant="middle" />}
                        <div key={meet.id}>
                            <MeetCard {...meet} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
