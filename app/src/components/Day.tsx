import React from 'react';
import {Meet} from "../modules/meet";
import {getMonthLongTitle} from "../tools/date";
import {Divider, Stack, Theme, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {LocalDate} from "@js-joda/core";
import MeetCard from "./cards/MeetCard";
import {DEFAULT_COLOR} from "../tools/theme";

const useStyles = makeStyles((theme: Theme) => ({
    month: {
        fontSize: 13,
        fontWeight: 700,
    },
}));

interface DayProps {
    date: string
    meets: Meet[]
    refetch: () => void
}
export default function Day({ date, meets, refetch }: DayProps): JSX.Element {
    const classes = useStyles();
    if (!date) { return <></> }
    const localDate = LocalDate.parse(date)
    const day = localDate.dayOfMonth()
    const monthShortTitle = getMonthLongTitle(localDate.monthValue())

    return (
        <Stack spacing={1} key={date}>
            <Stack spacing={1} direction="row" alignItems="flex-end">
                <Typography style={{ fontFamily: 'Bebas Neue', fontSize: 26, lineHeight: '28px' }}>
                    {day}
                </Typography>
                <Typography className={classes.month} variant="subtitle1" color="textSecondary">
                    {monthShortTitle}
                </Typography>
            </Stack>
            <Stack spacing={1}>
                {meets.map((meet, index) =>
                    <div key={meet.id}>
                        {Boolean(index) && <Divider light variant="middle" />}
                        <div key={meet.id}>
                            <MeetCard meet={meet} refetch={refetch} />
                        </div>
                    </div>
                )}
            </Stack>
        </Stack>
    )
}
